import './App.css';
import { useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function App() {
  const [todo, setTodo] = useState({desc:'', date:'', priority:''});
  const [todos, setTodos] = useState([]);
  
  const gridRef = useRef();

  const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value});
  }
  
  const addTodo = (event) => {
    event.preventDefault();
    setTodos([...todos, todo]);
    setTodo({desc:'', date:''});
  }

  const colums = [
    {headerName: 'Date', field: 'date', sortable: true, filter: true, floatingFilter: true},
    {headerName: 'Description', field: 'desc', sortable: true, filter: true, floatingFilter: true}, 
    {headerName: 'Piority', field: 'priority', sortable: true, filter: true, floatingFilter: true,
    cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'}}
  ]

  const deleteTodo = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
      setTodos(todos.filter((todo, index) => index !== gridRef.current.getSelectedNodes()[0].childIndex))
    } else {
      alert('Select row first');
    }
  }


  return (
    <div className="App">
      <div className='App-header'> 

      <h2 > Simple todo-list </h2>

      </div> 

      
        <label>Date:</label>
        <input type="date" name="date" value={todo.date} onChange={inputChanged} />
        <label>Description:</label>
        <input type="text" name="desc" value={todo.desc} onChange={inputChanged} />
        <label>Priority:</label>
        <input type="text" name="priority" value={todo.priority} onChange={inputChanged} />
        <button onClick={addTodo}> Add </button>
        <button onClick={deleteTodo}> Delete </button>

      
      <div className="ag-theme-material" style={{height: '700px', width: '80%', margin: 'auto'}}>
      <AgGridReact
      ref={gridRef}
      onGridReady={params => gridRef.current = params.api}
      rowSelection="single"
      columnDefs={colums}
      rowData={todos}
      animateRows={true}>
        
      </AgGridReact> 
      </div>
    </div>
  );
}

export default App;
