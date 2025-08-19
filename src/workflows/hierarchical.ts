import {
  StateGraph,
  MessagesAnnotation,
  Annotation,
} from '@langchain/langgraph'
import { writeFileSync } from 'node:fs'

export async function hierarchicalA() {
  enum AgentStateCondition {
    Failed = 'Failed',
    Complete = 'Complete',
    Incomplete = 'Incomplete',
  }

  const ConditionalBranchingAnnotation = Annotation.Root({
    aggregate: Annotation<string>({
      reducer: (x, y) => x.concat(y),
    }),
    condition: Annotation<AgentStateCondition>(),
  })

  async function agent1(
    _: typeof ConditionalBranchingAnnotation.State
  ): Promise<Partial<typeof ConditionalBranchingAnnotation.State>> {
    return {}
  }
  async function agent2(
    _: typeof ConditionalBranchingAnnotation.State
  ): Promise<Partial<typeof ConditionalBranchingAnnotation.State>> {
    return {}
  }
  async function agent3(
    _: typeof ConditionalBranchingAnnotation.State
  ): Promise<Partial<typeof ConditionalBranchingAnnotation.State>> {
    return {}
  }

  const workflow = new StateGraph(ConditionalBranchingAnnotation)
    .addNode('agent1', agent1)
    .addNode('agent2', agent2)
    .addNode('agent3', agent3)

  workflow.addEdge('__start__', 'agent1')
  workflow.addEdge('agent1', 'agent2')
  workflow.addConditionalEdges('agent2', (state) => state.condition, {
    Failed: 'agent1',
    Incomplete: 'agent3',
    Complete: '__end__',
  })
  workflow.addEdge('agent3', '__end__')

  const app = workflow.compile()
  const graph = app.getGraph()
  const image = await graph.drawMermaidPng()
  const arrayBuffer = await image.arrayBuffer()

  const filePath = './build/hierarchicalA.png'
  writeFileSync(filePath, new Uint8Array(arrayBuffer))
}

export async function hierarchicalB() {
  async function agent1(
    _: typeof MessagesAnnotation.State
  ): Promise<Partial<typeof MessagesAnnotation.State>> {
    return {}
  }
  async function agent2(
    _: typeof MessagesAnnotation.State
  ): Promise<Partial<typeof MessagesAnnotation.State>> {
    return {}
  }
  async function agent3(
    _: typeof MessagesAnnotation.State
  ): Promise<Partial<typeof MessagesAnnotation.State>> {
    return {}
  }
  async function agent4(
    _: typeof MessagesAnnotation.State
  ): Promise<Partial<typeof MessagesAnnotation.State>> {
    return {}
  }
  async function agent5(
    _: typeof MessagesAnnotation.State
  ): Promise<Partial<typeof MessagesAnnotation.State>> {
    return {}
  }

  const workflow = new StateGraph(MessagesAnnotation)
    .addNode('agent1', agent1)
    .addNode('agent2', agent2)
    .addNode('agent3', agent3)
    .addNode('agent4', agent4)
    .addNode('agent5', agent5)

  workflow.addEdge('__start__', 'agent1')
  workflow.addEdge('agent1', 'agent2')
  workflow.addEdge('agent1', 'agent3')
  workflow.addEdge('agent1', 'agent4')
  workflow.addEdge('agent2', 'agent5')
  workflow.addEdge('agent3', 'agent5')
  workflow.addEdge('agent4', 'agent5')
  workflow.addEdge('agent5', '__end__')

  const app = workflow.compile()
  const graph = app.getGraph()
  const image = await graph.drawMermaidPng()
  const arrayBuffer = await image.arrayBuffer()

  const filePath = './build/hierarchicalB.png'
  writeFileSync(filePath, new Uint8Array(arrayBuffer))
}

export async function hierarchicalC() {
  enum AgentStateCondition {
    Stop = 'Stop',
    Continue = 'Continue',
  }

  const ConditionalBranchingAnnotation = Annotation.Root({
    aggregate: Annotation<string[]>({
      reducer: (x, y) => x.concat(y),
      default: () => [],
    }),
    condition: Annotation<AgentStateCondition>(),
  })

  async function agent1(
    _: typeof ConditionalBranchingAnnotation.State
  ): Promise<Partial<typeof ConditionalBranchingAnnotation.State>> {
    return {}
  }
  async function humanAgent(
    _: typeof ConditionalBranchingAnnotation.State
  ): Promise<Partial<typeof ConditionalBranchingAnnotation.State>> {
    return {}
  }
  async function agent3(
    _: typeof ConditionalBranchingAnnotation.State
  ): Promise<Partial<typeof ConditionalBranchingAnnotation.State>> {
    return {}
  }

  const workflow = new StateGraph(ConditionalBranchingAnnotation)
    .addNode('agent1', agent1)
    .addNode('humanAgent', humanAgent)
    .addNode('agent3', agent3)

  workflow.addEdge('__start__', 'agent1')
  workflow.addEdge('agent1', 'humanAgent')
  workflow.addConditionalEdges('humanAgent', (state) => state.condition, {
    Continue: 'agent3',
    Stop: '__end__',
  })
  workflow.addEdge('agent3', '__end__')

  const app = workflow.compile()
  const graph = app.getGraph()
  const image = await graph.drawMermaidPng()
  const arrayBuffer = await image.arrayBuffer()

  const filePath = './build/hierarchicalC.png'
  writeFileSync(filePath, new Uint8Array(arrayBuffer))
}
