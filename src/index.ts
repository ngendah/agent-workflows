import * as supervisorWorkflow from './workflows/supervisor'
import * as networkWorkflow from './workflows/network'
import * as hierarchical from './workflows/hierarchical'
import * as complexWorkflow from './workflows/complex'

async function main() {
  await Promise.all([
    supervisorWorkflow.supervisor(),
    networkWorkflow.networkA(),
    networkWorkflow.networkB(),
    hierarchical.hierarchicalA(),
    hierarchical.hierarchicalB(),
    hierarchical.hierarchicalC(),
    complexWorkflow.complex(),
  ])
}

if (require.main === module) {
  main()
}
