import { useState } from 'react';
import './App.css';
import Table from 'react-bootstrap/Table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App(){
  let [formData,setFormData]=useState(//1//initially the datas
    {
      uName:'',
      uEmail:'',
      uPhone:'',
      uMessage:'',
      index:''
    }
);


let getValue=(event)=>{//2
    let oldData={...formData};
    let inputName=event.target.name;
    let inputValue=event.target.value;
    oldData[inputName]=inputValue;
    setFormData(oldData);
  }


  let [userData,setUserData]=useState([]);//for updating userDetails//3


  let submitHandle=(event)=>{//for save the olddata plus newdata//4
    let currentUserFormData={
      uName:formData.uName,
      uEmail:formData.uEmail,
      uPhone:formData.uPhone,
      uMessage:formData.uMessage
    }



    if(formData.index===""){////2 for edit//if no index is present that means user came here for insert...if index is present then go to the else condition
      let checkAndFilterUserData=userData.filter((v,i)=>v.uEmail==formData.uEmail ||v.uPhone==formData.uPhone)
      if(checkAndFilterUserData.length==1){
      
        toast.warning("Email or Phone Already Exists!!!!");
      }
      else{
          let oldUserData=[...userData,currentUserFormData];//old array+new array element
          
          setUserData(oldUserData);
          setFormData(//after submission the input fields will be cleaned
          {
        
            uName:'',
            uEmail:'',
            uPhone:'',
            uMessage:'',
            index:''
          }
      
        )
      }
    }
    else{
      let editIdx=formData.index;
      let oldDataForEdit=userData;
      let checkAndFilterUserData=userData.filter((v,i)=>(v.uEmail==formData.uEmail ||v.uPhone==formData.uPhone) && i!=editIdx )//check others email except self
      if(checkAndFilterUserData.length==0){
        //[{}{}]---->first and second object in userdata
        oldDataForEdit[editIdx]['uName']=formData.uName;
        oldDataForEdit[editIdx]['uEmail']=formData.uEmail;
        oldDataForEdit[editIdx]['uPhone']=formData.uPhone;
        oldDataForEdit[editIdx]['uMessage']=formData.uMessage;
        setUserData(oldDataForEdit);
        setFormData(
          {
        
            uName:'',
            uEmail:'',
            uPhone:'',
            uMessage:'',
            index:''
          }
        )
        toast.info("Data Updated Successfully!");
      }
      else{
        toast.warning("Email or Phone Already Exists! Please Update With Another Email or Phone.");
      }

      
    }
    toast.success("Save successfully!");
     event.preventDefault();

  }



  let deleteRow=(indexNumber)=>{//map index of button
    let newUserDataAfterDelet=userData.filter((v,i)=>i!=indexNumber);
    setUserData(newUserDataAfterDelet);
    toast.error("Data Deleted!");
    
  }


  let editRow=(indexNumberForEdit)=>{//1.for edit
    //alert(indexNumberForEdit);
    let editData=userData.filter((v,i)=>i==indexNumberForEdit)[0];
    //console.log(editData);
    editData['index']=indexNumberForEdit;
    
    setFormData(editData);
    
  }



   return (
    <div className="App">
      <ToastContainer />
      <div className='container-fluid'>
      <div className='container'>
        <h2 className='my-3'>Enquiry Now</h2>
        <div className='row justify-content-center'>
          <div className='col-lg-5'>
             
            <form onSubmit={submitHandle}>
              <div className='pb-3'>
                <label className='form-lable text-end'>Name</label>
                <input type="text" name="uName" value={formData.uName} onChange={getValue} className='form-control' />
              </div>
              <div className='pb-3'>
                <label className='form-lable'>Email</label>
                <input type="email" name="uEmail" value={formData.uEmail} onChange={getValue} className='form-control'/>
              </div>
              <div className='pb-3'>
                <label className='form-lable'>Phone</label>
                <input type="text" name="uPhone" value={formData.uPhone} onChange={getValue} className='form-control' />
              </div>
              <div className='mb-3'>
                <label className='form-lable'>Message</label>
                <textarea className='form-control ' value={formData.uMesseage} name="uMessage" id="" rows="3" onChange={getValue} />
              </div>
              
                <button className='btn btn-primary px-5'>
                  {
                    formData.index!==""? 'Upadte' : 'Save'
                  }
                </button>
              
            </form>
          </div>

        </div>
          <div className='row my-5 justify-content-center'>
            <h4 className='my-5'>Enquiry Data</h4>
          <div className='col-lg-7'>
             <Table striped bordered hover className='border-secondary'>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Message</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {userData.length>=1?
        userData.map((obj,index)=>{//when userData is present the the loop will be exexuted
          return(
            <tr key={index}>
              <td>{index+1}</td>
              <td>{obj.uName}</td>
              <td>{obj.uEmail}</td>
              <td>{obj.uPhone}</td>
              <td>{obj.uMessage}</td>
              <td>
                <button type="button" className="btn btn-danger my-2" onClick={()=>deleteRow(index)}>Delete</button>
                <button type="button" className="btn btn-info my-2" onClick={()=>editRow(index)}>Edit</button>
              </td>
            </tr>
          );
        })
          
        :
        <tr>
          <td colSpan={6}>No Data Found!</td>
        </tr>
        }
        

      </tbody>
    </Table>
          </div>
          </div>
      </div>
      </div>
    </div>
  );
}

export default App;
