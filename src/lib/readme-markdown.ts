const BOX_DRAWING_PATTERN = /[\u2500-\u257F]/
const FLOW_SYMBOL_PATTERN = /[▼▲→←↔↕·]/

function isDiagramLine(line: string) {
  return BOX_DRAWING_PATTERN.test(line) || FLOW_SYMBOL_PATTERN.test(line)
}

function isDiagramContinuationLine(line: string) {
  if (isDiagramLine(line)) {
    return true
  }

  // Some architecture diagrams include indented labels under arrows.
  return /^\s{4,}\S/.test(line)
}

export function preserveAsciiDiagrams(markdown: string) {
  const lines = markdown.split("\n")
  const output: string[] = []

  let index = 0
  let inFence = false

  while (index < lines.length) {
    const line = lines[index]

    if (/^\s*```/.test(line)) {
      inFence = !inFence
      output.push(line)
      index += 1
      continue
    }

    if (!inFence && isDiagramLine(line)) {
      const block: string[] = []

      while (index < lines.length) {
        const currentLine = lines[index]

        if (currentLine.trim() === "" || /^\s*```/.test(currentLine)) {
          break
        }

        if (!isDiagramContinuationLine(currentLine)) {
          break
        }

        block.push(currentLine)
        index += 1
      }

      if (block.length >= 3) {
        output.push("```text", ...block, "```")
      } else {
        output.push(...block)
      }

      continue
    }

    output.push(line)
    index += 1
  }

  return output.join("\n")
}
