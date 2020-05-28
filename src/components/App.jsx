import React from "react";

export default class App extends React.Component
{

  constructor(props)
  {
    super();
    this.state={
      userinput:'',
      list: [],
      length: 0
    }
  }


  setInput(input)
  {
    this.setState({userinput:input});
  }


  addList(item)
  {
    var l=this.state.length;
    l=l+1;
    let temp=this.state.list;
    temp.push(item);
    this.setState({list:temp});
    this.setState({length:l});
    document.getElementById("todoinput").value='';
  }



  async reArrange(e)
  {
    const removeId = e.target.getAttribute("checkboxid");
    
    //rearrange
    let items=this.state.list;
    var temp=items[this.state.length-1];
    items[this.state.length-1]=items[removeId];
    items[removeId]=temp;
    this.setState({list:items})
    

  }

removeButton(e)
{
  //remove button for completed tasks
  const removeId = e.target.getAttribute("checkboxid");
  var ancestor =  document.getElementById('id');
  ancestor.getElementsByTagName('LI')[this.state.length-1].style.textDecoration = "line-through";
  ancestor.getElementsByTagName('INPUT')[removeId].checked =  false;
  ancestor.getElementsByTagName('INPUT')[this.state.length-1].remove();
  
  let l=this.state.length;
  l=l-1;
  this.setState({length:l})
}





  render()
  {
    let counter=0;

  return(<div >
      <input value={this.state.input} onChange={(e)=>{this.setInput(e.target.value)}} id="todoinput" ></input>
      <button onClick={()=>this.addList(this.state.userinput)}>ADD</button>

      <div id="id">
        {this.state.list.map((val,index)=>
        <div key={index}>
          <li>{val}<input type="checkbox" id="myCheck" checkboxid={counter++}  onChange={(e)=>this.reArrange(e) && this.removeButton(e)}></input></li>
        </div>)
        }
      </div>
    </div>);
  }
}


