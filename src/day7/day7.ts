import { getInput } from '../common/get-input';
import { assert } from '../common/assert';

interface IRule {
  bag: string;
  contains: [string, number][];
}

interface IGraph {
  nodes: IBagNode[];
}

interface IBagNode {
  bag: string;
  contains: [IBagNode, number][];
}

export const day7 = (): void => {
  const graph = parseRules(getInput(7));

  const result7_1 = day7_1(graph, 'shiny gold');
  console.log(`Day 7-1: ${result7_1}`);

  const result7_2 = day7_2(graph, 'shiny gold');
  console.log(`Day 7-2: ${result7_2}`);
};

export const day7_1 = (graph: IGraph, bagToFind: string): number => {
  const canContain = (node: IBagNode, bagToFind: string): boolean =>
    node.bag === bagToFind || node.contains.some(([node]) => canContain(node, bagToFind));

  return graph.nodes
    .filter((n) => n.bag !== bagToFind)
    .reduce((acc, node) => acc + (canContain(node, bagToFind) ? 1 : 0), 0);
};

export const day7_2 = (graph: IGraph, bag: string): number => {
  return totalBagsNeeded(graph, bag) - 1;
};

export const totalBagsNeeded = (graph: IGraph, bag: string): number => {
  const countBagsNeeded = (node: IBagNode): number => {
    return node.contains.reduce(
      (acc, [node, count]) => acc + count * countBagsNeeded(node),
      1
    );
  };

  const node = graph.nodes.find((n) => n.bag === bag);
  assert(node);
  return countBagsNeeded(node);
};

export const parseRules = (input: string): IGraph => {
  return toGraph(input.split('\n').map((line) => parseRule(line.trim())));
};

export const parseRule = (ruleString: string): IRule => {
  const matches = ruleRegexp.exec(ruleString);
  assert(matches, `Invalid rule: ${ruleString}`);
  const [, bag, containString] = matches;

  return {
    bag,
    contains: parseContain(containString),
  };
};

export const parseContain = (containString: string): [string, number][] => {
  if (containString === 'no other bags') {
    return [];
  }

  return containString.split(',').map((c) => {
    const matches = singleContainRegexp.exec(c);
    assert(matches, `Invalid contain: ${c}`);
    const [, count, bag] = matches;
    return [bag, parseInt(count)];
  });
};

const ruleRegexp = new RegExp(/([\w ]+) bags contain ([\w\d ,]+)\./);
const singleContainRegexp = new RegExp(/(\d+) ([\w ]+) bags?/);

const toGraph = (rules: IRule[]): IGraph => {
  const graph: IGraph = {
    nodes: rules.map(
      (rule): IBagNode => ({
        bag: rule.bag,
        contains: [],
      })
    ),
  };

  rules.forEach((rule) => {
    const ruleNode = getNodeForBag(graph, rule.bag);
    ruleNode.contains.push(
      ...rule.contains.map(([bag, count]): [IBagNode, number] => [
        getNodeForBag(graph, bag),
        count,
      ])
    );
  });

  return graph;
};

const getNodeForBag = (graph: IGraph, bag: string): IBagNode => {
  const node = graph.nodes.find((n) => n.bag === bag);
  assert(node, `Failed to find node for bag: ${bag}`);
  return node;
};
