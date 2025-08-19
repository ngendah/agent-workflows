import { StateGraph, MessagesAnnotation } from '@langchain/langgraph'
import { writeFileSync } from 'node:fs'

export async function supervisor() {
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

  const workflow = new StateGraph(MessagesAnnotation)
    .addNode('agent1', agent1)
    .addNode('agent2', agent2)
    .addNode('agent3', agent3)

  workflow.addEdge('__start__', 'agent1')
  workflow.addEdge('agent1', 'agent2')
  workflow.addEdge('agent1', 'agent3')
  workflow.addEdge('agent1', '__end__')
  workflow.addEdge('agent2', 'agent1')
  workflow.addEdge('agent3', 'agent1')

  const app = workflow.compile()
  const graph = app.getGraph()
  const image = await graph.drawMermaidPng()
  const arrayBuffer = await image.arrayBuffer()

  const filePath = './build/supervisor.png'
  writeFileSync(filePath, new Uint8Array(arrayBuffer))
}
