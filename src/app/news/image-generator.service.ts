import { Injectable } from '@angular/core'
import html2canvas from 'html2canvas'

export interface LinkedinPostData {
    title: string
    description: string
    coverImage?: string
    authorName?: string
    authorTitle?: string
    authorAvatar?: string
}

export interface GeneratedImage {
    dataUrl: string // base64 PNG — use as <img [src]> or upload
    blob: Blob // raw binary — use for FormData / file uploads
    width: number
    height: number
}

@Injectable({ providedIn: 'root' })
export class ImageGeneratorService {
    /**
     * Generate a simple cover image (PNG) for the LinkedIn card when no cover image is provided.
     * Uses a canvas so it can be used immediately as a data URL.
     */
    async generateCoverPlaceholder(options: {
        title: string
        subtitle?: string
        width?: number
        height?: number
    }): Promise<GeneratedImage> {
        const width = options.width ?? 480
        const height = options.height ?? 628

        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        if (!ctx) {
            throw new Error('Canvas 2D context not available')
        }

        // Background (match the placeholder gradient used in the component styles)
        const gradient = ctx.createLinearGradient(0, 0, width, height)
        gradient.addColorStop(0, '#24356D')
        gradient.addColorStop(1, '#161F48')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, width, height)

        // Subtle overlay to improve text contrast
        ctx.fillStyle = 'rgba(0, 0, 0, 0.10)'
        ctx.fillRect(0, 0, width, height)

        const padding = 30
        const maxTextWidth = width - padding * 2

        // Title
        ctx.fillStyle = '#F4C963'
        ctx.textBaseline = 'top'
        ctx.font =
            '700 20px Plus Jakarta Sans, system-ui, -apple-system, sans-serif'
        const titleLines = this.wrapText(
            ctx,
            options.title?.trim().toUpperCase() || 'Update',
            maxTextWidth,
            3
        )
        const titleLineHeight = 24
        let y = 20
        for (const line of titleLines) {
            ctx.fillText(line, padding, y)
            y += titleLineHeight
        }

        // Subtitle
        const subtitle = options.subtitle?.trim()
        if (subtitle) {
            y += 12
            ctx.fillStyle = '#fff'
            ctx.font =
                '500 18px Plus Jakarta Sans, system-ui, -apple-system, sans-serif'
            const subLines = this.wrapText(ctx, subtitle, maxTextWidth, 2)
            const subLineHeight = 30
            for (const line of subLines) {
                ctx.fillText(line, padding, y)
                y += subLineHeight
            }
        }

        // Footer label
        // ctx.fillStyle = 'rgba(15, 23, 42, 0.65)'
        // ctx.font = '600 18px Segoe UI, system-ui, -apple-system, sans-serif'
        // ctx.fillText('SymAware', padding, height - padding - 22)

        const dataUrl = canvas.toDataURL('image/png')
        const blob = await this.dataUrlToBlob(dataUrl)

        return {
            dataUrl,
            blob,
            width: canvas.width,
            height: canvas.height,
        }
    }

    /**
     * Captures a DOM element as a PNG image.
     *
     * @param element  The HTMLElement to snapshot (e.g. linkedinCard.cardElement)
     * @param scale    Device-pixel ratio override. Default 2 = 2× resolution (2400×1256px output).
     */
    async captureElement(
        element: HTMLElement,
        scale = 2
    ): Promise<GeneratedImage> {
        console.error(html2canvas)
        const canvas = await html2canvas(element, {
            // scale,
            useCORS: true, // allow cross-origin images (cover photos, avatars)
            allowTaint: false,
            // backgroundColor: '#ffffff',
            logging: false,
        })

        const dataUrl = canvas.toDataURL('image/png')
        const blob = await this.dataUrlToBlob(dataUrl)

        return {
            dataUrl,
            blob,
            width: canvas.width,
            height: canvas.height,
        }
    }

    /** Trigger a browser download of the generated image. */
    downloadImage(image: GeneratedImage, filename = 'linkedin-post.png'): void {
        const anchor = document.createElement('a')
        anchor.href = image.dataUrl
        anchor.download = filename
        anchor.click()
    }

    /** Convert to a Blob for direct upload via FormData. */
    private dataUrlToBlob(dataUrl: string): Promise<Blob> {
        return fetch(dataUrl).then((r) => r.blob())
    }

    private wrapText(
        ctx: CanvasRenderingContext2D,
        text: string,
        maxWidth: number,
        maxLines: number
    ): string[] {
        const words = text.split(/\s+/).filter(Boolean)
        const lines: string[] = []
        let current = ''

        for (const word of words) {
            const next = current ? `${current} ${word}` : word
            if (ctx.measureText(next).width <= maxWidth) {
                current = next
                continue
            }

            if (current) {
                lines.push(current)
            }
            current = word

            if (lines.length === maxLines - 1) {
                break
            }
        }

        if (lines.length < maxLines && current) {
            lines.push(current)
        }

        // If we truncated, add ellipsis.
        const usedWords = lines.join(' ').split(/\s+/).filter(Boolean).length
        if (usedWords < words.length && lines.length) {
            let last = lines[lines.length - 1]
            while (
                ctx.measureText(`${last}…`).width > maxWidth &&
                last.length > 0
            ) {
                last = last.slice(0, -1)
            }
            lines[lines.length - 1] = `${last}…`
        }

        return lines
    }
}
