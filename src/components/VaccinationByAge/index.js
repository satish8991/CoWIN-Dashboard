import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

import './index.css'

const VaccinationByAge = props => {
  const {vaccinationByAge} = props
  console.log(vaccinationByAge)
  return (
    <div className="vaccination-coverage-container">
      <h1 className="component-heading">Vaccination by Age</h1>
      <ResponsiveContainer
        className="by-gender-container"
        width="100%"
        height={300}
      >
        <PieChart>
          <Pie
            cx="50%"
            cy="50%"
            data={vaccinationByAge}
            startAngle={0}
            endAngle={360}
            innerRadius="40%"
            outerRadius="70%"
            dataKey="count"
          >
            <Cell name="18-44" fill="#5a8dee" />
            <Cell name="44-60" fill="  #a3df9f" />
            <Cell name="Above 60" fill=" #2cc6c6" />
          </Pie>
          <Legend
            iconType="circle"
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationByAge
