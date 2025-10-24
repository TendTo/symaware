# /// script
# requires-python = ">=3.13"
# dependencies = [
#     "pandas",
#     "odfpy",
#     "habanero",
#     "openpyxl",
# ]
# ///
import pandas as pd
from habanero import Crossref


# {
#     title: 'SySCoRe: Synthesis via Stochastic Coupling Relations',
#     authors:
#         'Birgit van Huijgevoort, Oliver Schön, Sadegh Soudjani, Sofie Haesaert',
#     link: 'https://dl.acm.org/doi/abs/10.1145/3575870.3587123',
#     year: '2023',
#     doi: '10.1145/3575870.3587123',
# },

"""
'Date added in matrix'
'Status'
'Added to EU Platform'
'Type of PID (repository) (This information is mandatory)'
'PID (publisher version of record) (DOI of the publised paper in journals/conferences/books etc. do not inclue DOI of arxiv versions in this column).'
'PID of deposited publication (DOI of the repository version of the paper e.g. arxiv).'
'Type of publication'
'Link to publication'
'Title of the scientific publication'
'Authors'
'Title of the Journal or equivalent'
'Number'
'ISSN or eISSN'
'Publisher'
'Month of publication'
'Year of publication'
'Was the publication available in open access through the repository at the time of publication?'
'Peer-reviewed'
'PID of Book'
'Book title'
'Did you charge OA publishing fees to the project?'
'Article processing costs that will be charged to the project'
'Consortium partner involved'
'Topic'
'What kind of data was used in your publication (simulation/standard datasets'
'Is the data ta Uploaded in Zenodo?'
"""


def updated_column_names() -> str:
    return [
        "date",
        "status",
        "eu_platform",
        "type_pid_repo",
        "pid",
        "pid_pub",
        "type_pub",
        "link",
        "title",
        "authors",
        "journal",
        "number",
        "issn",
        "publisher",
        "month",
        "year",
        "open_access",
        "peer_reviewed",
        "pid_book",
        "book_title",
        "oa_fees",
        "apc_charged",
        "consortium_partner",
        "topic",
        "data_used",
        "data_zenodo",
    ]


def cleanup_excel():
    df = pd.read_excel("pubs.ods", header=1, engine="odf")

    df.columns = updated_column_names()
    # change the open_access column to boolean
    df["open_access"] = df["open_access"].map({"Yes": True, "No": False, "yes": True, "no": False})
    df["peer_reviewed"] = df["peer_reviewed"].map({"Yes": True, "No": False, "yes": True, "no": False})
    df["type_pub"] = df["type_pub"].apply(lambda x: x.strip() if isinstance(x, str) else x)

    # print(df["status"].drop_duplicates().to_list())
    # print(df["eu_platform"].drop_duplicates().to_list())
    # print(df["year"].drop_duplicates().to_list())
    # print(df["type_pid_repo"].drop_duplicates().to_list())
    # print(df["type_pub"].drop_duplicates().to_list())
    # print(df["open_access"].drop_duplicates().to_list())
    # print(df["peer_reviewed"].drop_duplicates().to_list())

    # Drop rows where 'title' is NaN
    df.dropna(subset=["title", "year"], inplace=True)
    # Year column to int
    df["year"] = df["year"].astype(int).astype(str)
    df["issn"] = df["issn"].astype(str).replace("nan", "")
    # Rename the first column to "id"
    # print(df[columns[0]].dtypes)

    cr = Crossref()

    def get_doi(title: str) -> str:
        try:
            result = cr.works(query=title)
            items = result["message"]["items"]
            if items:
                return items[0]["DOI"]
        except Exception as e:
            print(f"Error fetching DOI for {title}: {e}")
        return ""

    df["doi"] = df["title"].apply(get_doi)

    # df.to_json("pubs.json", orient="records", date_format="iso")


def main() -> None:
    df = pd.read_json("pubs.json")

    df["year"] = df["year"].astype(int).astype(str)
    df["open_access"] = df["open_access"].map({0.0: False, 1.0: True})
    df["peer_reviewed"] = df["peer_reviewed"].map({0.0: False, 1.0: True})
    df["apc_charged"] = df["apc_charged"].map({"Yes": True, "No": False, "yes": True, "no": False})
    df["consortium_partner"] = df["consortium_partner"].apply(
        lambda x: (x.strip()[:-1] if x.strip()[-1] == "," else x.strip()) if isinstance(x, str) else x
    )
    df["month"] = df["month"].apply(lambda x: x.strip() if isinstance(x, str) else x)
    df["temp_month_number"] = df["month"].map(
        {
            "January": 1,
            "February": 2,
            "March": 3,
            "April": 4,
            "May": 5,
            "June": 6,
            "July": 7,
            "August": 8,
            "September": 9,
            "October": 10,
            "November": 11,
            "December": 12,
        }
    ).fillna(13)

    print(df["apc_charged"].value_counts())
    print(df["eu_platform"].value_counts())
    print(df["open_access"].value_counts())
    print(df["peer_reviewed"].value_counts())

    df.sort_values(by=["year", "temp_month_number"], inplace=True)
    df.drop(columns=["temp_month_number"], inplace=True)

    df.to_json("new_pubs.json", orient="records", date_format="iso")


def updated_deliverables_column_names() -> str:
    return [
        "wp_number",
        "deliverable_related_no",
        "deliverable_no",
        "title",
        "description",
        "lead",
        "type",
        "dissemination_level",
        "due_date",
        "new_due_date",
        "delivery_date",
        "approval_date",
        "status",
    ]


def deliverables() -> None:
    df = pd.read_excel("Deliverables.xlsx", engine="openpyxl", header=4)
    df = df[df.columns[1:]]  # drop first unnamed column
    df.columns = updated_deliverables_column_names()
    df["wp_number"] = df["wp_number"].apply(lambda x: int(x[2:]) if isinstance(x, str) else x).astype(str)
    df["deliverable_no"] = df["deliverable_no"].apply(lambda x: int(x[1:]) if isinstance(x, str) else x).astype(str)
    df["link"] = ""
    df.to_json("deliverables.json", orient="records", date_format="iso")


if __name__ == "__main__":
    main()
