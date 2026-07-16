import * as cheerio from 'cheerio'
import type { Player, TeamData } from './types'

export const FEDERATION_URL =
  'https://padelfederacion.es/Paginas/Canarias/Ligas_Equipo.asp?IdEquipo=159321&Liga=28080'

function toTitleCase(input: string): string {
  return input
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function extractField(text: string, label: string): string {
  const patterns: Record<string, RegExp> = {
    equipo: /Nombre del Equipo:\s*([^]*?)\s*Liga\s*:/i,
    liga: /Liga\s*:\s*([^]*?)\s*Categor[ií]a/i,
    categoria: /Categor[ií]a\/Grupo\s*:\s*([^]*?)\s*Capit[aá]n/i,
    capitan: /Capit[aá]n\s*:\s*([^]*?)\s*(?:Listado|Num\b|$)/i,
  }
  const match = text.match(patterns[label])
  return match ? match[1].trim().replace(/\s+/g, ' ') : ''
}

export async function scrapeTeam(url: string): Promise<TeamData> {
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
    },
    next: { revalidate: 3600 },
  })

  if (!res.ok) {
    throw new Error(`La federación respondió con estado ${res.status}`)
  }

  const buffer = await res.arrayBuffer()
  const decoder = new TextDecoder('iso-8859-1')
  const html = decoder.decode(buffer)

  const $ = cheerio.load(html)

  const headerText = $('body').text().replace(/\s+/g, ' ')
  const equipo = extractField(headerText, 'equipo')
  const liga = extractField(headerText, 'liga')
  const categoria = extractField(headerText, 'categoria')
  const capitan = toTitleCase(extractField(headerText, 'capitan'))

  const jugadores: Player[] = []

  $('table').each((_, table) => {
    const headerCells = $(table)
      .find('tr')
      .first()
      .find('td, th')
      .map((_, c) => $(c).text().trim().toLowerCase())
      .get()

    const hasLicencia = headerCells.some((h) => h.includes('licencia'))
    const hasPuntos = headerCells.some((h) => h.includes('puntos'))
    if (!hasLicencia || !hasPuntos) return

    $(table)
      .find('tr')
      .slice(1)
      .each((_, row) => {
        const cells = $(row)
          .find('td')
          .map((_, c) => $(c).text().trim())
          .get()

        if (cells.length < 6) return
        const num = Number.parseInt(cells[0], 10)
        if (Number.isNaN(num)) return

        const nombre = toTitleCase(cells[2])
        const apellidos = toTitleCase(cells[3])
        const puntos = Number.parseInt(cells[4].replace(/\D/g, ''), 10) || 0
        const edad = Number.parseInt(cells[5].replace(/\D/g, ''), 10) || 0

        jugadores.push({
          num,
          licencia: cells[1],
          nombre,
          apellidos,
          fullName: `${nombre} ${apellidos}`.trim(),
          puntos,
          edad,
        })
      })
  })

  return { equipo, liga, categoria, capitan, jugadores }
}
