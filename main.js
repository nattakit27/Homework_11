const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);


function Counter(props) {
  console.log(props.item);

  const updateCounter = (n) => {
    if (props.item.number + n < 0) {
      return;
    }
    props.hdlUpdate(props.item.id, n);
  };


  const removeCounter = () => {
    props.hdlRemoveCounter(props.item.id);
  };

  return (
    <div className="counter">
      <button onClick={() => updateCounter(-1)}> - </button>
      <h2> {props.item.number} </h2>
      <button onClick={() => updateCounter(1)}> + </button>
      <button onClick={() => updateCounter(-props.item.number)}> C </button>
      <button onClick={removeCounter}> X </button>
    </div>
  );
}

function SumInfo(props) {
  const sum = props.counters.reduce((acc, counter) => acc + counter.number, 0);

  const stTitle = {
    color: props.color,
    fontSize: props.size === "jay" ? "50px" : "40px",
  };

  return (
    <div className="sumInfo">
      <h1 style={stTitle}>Sum = {sum}</h1>
    </div>
  );
}

function App() {
  const [counters, setCounters] = React.useState([{ id: 1, number: 0 }]);

  const hdlUpdate = (id, num) => {
    const cloneCounters = [...counters];
    let idx = cloneCounters.findIndex((el) => el.id === id);
    cloneCounters[idx].number += num;
    setCounters(cloneCounters);
  };

  const hdlAddCounter = () => {
    let newId = counters.length === 0 ? 1 : counters.at(-1).id + 1;
    const cloneCounters = [...counters];
    cloneCounters.push({ id: newId, number: 0 });
    setCounters(cloneCounters);
  };

  const hdlRemoveCounter = (id) => {

    const updatedCounters = counters.filter((counter) => counter.id !== id);
    setCounters(updatedCounters);
  };


  return (
    <>
      <div className="sumInfo">

        <h1 className="text-center">Codecamp Academy 01</h1> <br />
        <br />
        <button className="button-add" onClick={hdlAddCounter}>
          Add Counter
        </button>
      </div>
    
      <SumInfo color="red" size="jay" counters={counters} />

    
      {counters.map((el) => {
        return (
          <Counter
            key={el.id}
            item={el}
            hdlUpdate={hdlUpdate}
            hdlRemoveCounter={hdlRemoveCounter}
          />
        );
      })}
    </>
  );
}
