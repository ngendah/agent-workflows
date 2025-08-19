import { StateGraph, MessagesAnnotation } from '@langchain/langgraph'
import { writeFileSync } from 'node:fs'

export async function complex() {
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
  async function agent6(
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
    .addNode('agent6', agent6)

  workflow.addEdge('__start__', 'agent1')
  workflow.addEdge('agent1', 'agent2')
  workflow.addEdge('agent1', 'agent4')
  workflow.addEdge('agent4', 'agent2')
  workflow.addEdge('agent4', 'agent5')
  workflow.addEdge('agent2', 'agent5')
  workflow.addEdge('agent2', 'agent3')
  workflow.addEdge('agent3', 'agent5')
  workflow.addEdge('agent3', '__end__')
  workflow.addEdge('agent5', 'agent6')
  workflow.addEdge('agent6', '__end__')

  const app = workflow.compile()
  const graph = app.getGraph()
  const image = await graph.drawMermaidPng()
  const arrayBuffer = await image.arrayBuffer()

  const filePath = './build/complex.png'
  writeFileSync(filePath, new Uint8Array(arrayBuffer))
}
