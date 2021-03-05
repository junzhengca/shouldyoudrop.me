import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './app.css';

const DEFAULT_GRADING_ITEM = {
  name: 'Grading Item',
  grade: 90,
  weight: 10,
  isFinal: true,
}

function App() {

  const [gradingItems, setGradingItems] = useState({});

  const addGradingItem = () => {
    const newItems = {
      [uuidv4()]: {...DEFAULT_GRADING_ITEM},
      ...gradingItems,
    };
    setGradingItems(newItems);
  }

  const setGradingItem = (id, gradingItem) => {
    setGradingItems({
      ...gradingItems,
      [id]: gradingItem,
    });
  }

  const deleteGradingItem = (id) => {
    let newItems = {...gradingItems};
    delete newItems[id];
    setGradingItems(newItems);
  }

  const getFinalizedGrade = () => {
    let finalWeight = 0; // Finalized weight
    let finalGrade = 0; // Grade received on finalized weight
    for (const [, gradingItem] of Object.entries(gradingItems)) {
      if (gradingItem.isFinal) {
        finalWeight += new Number(gradingItem.weight);
        finalGrade += gradingItem.grade / 100 * gradingItem.weight;
      }
    }
    return [finalGrade, finalWeight];
  }

  const getCurrentGrade = () => {
    let currentWeight = 0;
    let currentGrade = 0;
    for (const [, gradingItem] of Object.entries(gradingItems)) {
      currentWeight += new Number(gradingItem.weight);
      currentGrade += gradingItem.grade / 100 * gradingItem.weight;
    }
    return [currentGrade, currentWeight];
  }

  const [finalGrade, finalWeight] = getFinalizedGrade();
  const [currentGrade, currentWeight] = getCurrentGrade();

  return (
    <div className="container pt-5">
      <h1>🤔 should you drop me?</h1>
      <p>quickly calculate your grades and drop before it is too late.</p>
      <hr/>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Grade (%)</th>
            <th scope="col">Weight</th>
            <th scope="col">Is Final</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(gradingItems).map(([id, gradingItem]) => {
            return (
              <tr key={id}>
                <td>
                  <input
                    className="form-control"
                    value={gradingItem.name}
                    onChange={e => setGradingItem(id, {...gradingItem, name: e.target.value})}
                  />
                </td>
                <td>
                  <input
                    className="form-control"
                    value={gradingItem.grade}
                    onChange={e => setGradingItem(id, {...gradingItem, grade: e.target.value})}
                  />
                </td>
                <td>
                <input
                    className="form-control"
                    value={gradingItem.weight}
                    onChange={e => setGradingItem(id, {...gradingItem, weight: e.target.value})}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={gradingItem.isFinal}
                    onChange={e => setGradingItem(id, {...gradingItem, isFinal: e.target.checked})}
                  />
                </td>
                <td>
                  <button className="btn btn-danger" onClick={() => deleteGradingItem(id)}>Delete</button>
                </td>
              </tr>
            )
          })}
          <tr>
            <td colSpan="5">
              <button className="btn btn-primary" onClick={addGradingItem}>add grading item</button>
            </td>
          </tr>
          <tr>
            <td colSpan="5">
              current finalized grade: <span className="grade-text">{finalGrade/finalWeight * 100}% ({finalGrade}/{finalWeight})</span><br/>
              <small>grade for all grading items marked as finalized</small>
            </td>
          </tr>
          <tr>
            <td colSpan="5">
              current grade: <span className="grade-text">{currentGrade/currentWeight * 100}% ({currentGrade}/{currentWeight})</span><br/>
              <small>grade for all grading items</small>
            </td> 
          </tr>
          <tr>
            <td colSpan="5">
              percentage finalized: <span className="grade-text">{finalWeight/currentWeight * 100}%</span><br/>
              <small>how much of your grade has been finalized</small>
            </td> 
          </tr>
          <tr>
            <td colSpan="5">
              maximum grade: <span className="grade-text">{(finalGrade + (currentWeight - finalWeight))/currentWeight * 100}%</span><br/>
              <small>maximum possible grade assuming you get perfect for all non-finalized grading items</small>
            </td> 
          </tr>
        </tbody>
      </table>
      <hr/>
      <small>Super extreme alpha v0.001 | Built with ❤️ &nbsp;by junzhengca</small>
    </div>
  );
}

export default App;
