/** @file Sparkline style (small) pie chart */

import { VictoryContainer, VictoryPie } from 'victory'

type Props = {
  numOfComplete: number
  numOfIncomplete: number
}

/**
 * Simple Pie Chart
 * @param {Object} props Component properties
 * @param {number} props.numOfComplete Number of completed items
 * @param {number} props.numOfIncomplete Number of incompleted items
 * @returns {JSX.Element} Pie Chart
 */
export const CompletedPieChart = ({
  numOfComplete,
  numOfIncomplete
}: Props) => (
  <VictoryPie
    containerComponent={
      <VictoryContainer
        title={`${numOfComplete} of ${numOfComplete + numOfIncomplete} done`}
      />
    }
    data={[
      {
        x: 'a',
        y: numOfComplete
      },
      { x: 'b', y: numOfIncomplete }
    ]}
  />
)
