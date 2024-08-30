import React,{useState} from 'react'
import Validation from '../../../form/Validation';

import { getItemFromCookie,setItemInCookie,removeItemInCookie } from '../../../helpers/cookie';
export const EditCity = ({setEditBanner,addCity,setPayload,payload,upDateCity,addLebal}) => {
    let editBanner = {
        name:'',
        is_active:'',
    }
    const [form, setForm] = useState(payload?payload:editBanner);
    const HandleChange = (e)=>{
        
        const {name,value} = e.target;
        let isValid = isAllowed(value, name);
        if (isValid) {
         setForm({ ...form, [name]: value });
         
         }
     }
     const isAllowed = (value, type) => {
        switch (type){
          case 'name':
            return (value === '' || (Validation.validateChar(value) && value.length < 51)); 
          case 'is_active':
            return  true;
          default:
            return  true;
        }
      }
      setPayload(form)
  return (
   <>
    <div className="modal fade bs-example-modal-lg show" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-modal="true" style={{display: 'block'}}>
        <div className="modal-dialog modal-lg">
            <div className="modal-content">
                <div className="modal-header">
                    <h6 className="modal-title mt-0" id="myLargeModalLabel">{payload?'Update':'Add New'} City</h6>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>setEditBanner(false)}></button>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="row">
                            <div className="col-md-6">
                                <label className="form-label" htmlFor="LeadName">City Name</label>
                                <input type="text" className="form-control" id="LeadName" name='name' value={form.name} required="" onChange={(e)=>HandleChange(e)}/>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label mt-2" htmlFor="PhoneNo">City Status</label><br/>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="is_active" id="inlineRadio1" checked={form.is_active ==1?true:false} value="1" onChange={(e)=>HandleChange(e)}/>
                                    <label className="form-check-label" htmlFor="inlineRadio1">Active</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="is_active" id="inlineRadio2" checked={form.is_active ==0?true:false} value="0" onChange={(e)=>HandleChange(e)}/>
                                    <label className="form-check-label" htmlFor="inlineRadio2">in Active</label>
                                </div>
                            </div>
                        </div>
                        <button type="button" className="btn btn-sm btn-primary mt-2" onClick={()=>addLebal === true?addCity():upDateCity()}>Save</button>  
                        {/* <button type="button" className="btn btn-sm btn-danger mt-2">Delete</button>              */}
                    </form>  
                </div>
            </div>
        </div>
    </div>
    <div className='modal-backdrop fade show'></div>
   </>
  )
}
