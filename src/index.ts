import * as supervisorWorkflow from './workflows/supervisor'
import * as networkWorkflow from './workflows/network'
import * as hierarchical from './workflows/hierarchical'
import * as complexWorkflow from './workflows/complex'
import { mkdir } from 'fs/promises'

async function main() {
  const outDir = 'build/'
  await mkdir(outDir, { recursive: true })
  await Promise.all([
    supervisorWorkflow.supervisor(outDir),
    networkWorkflow.networkA(outDir),
    networkWorkflow.networkB(outDir),
    hierarchical.hierarchicalA(outDir),
    hierarchical.hierarchicalB(outDir),
    hierarchical.hierarchicalC(outDir),
    complexWorkflow.complex(outDir),
  ])
}

if (require.main === module) {
  main()
}
