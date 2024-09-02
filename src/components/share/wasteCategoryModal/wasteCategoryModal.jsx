import React, { useState,useRef } from 'react'
import Validation from '../../../form/Validation';
import imageCompression from "browser-image-compression";
export const WasteCategoryModel = ({meashuMaster, payload,setEditBanner,setPayload,bannerFunction}) => {

    let editBanner = {
        name:'',
        label:'',
        weight:'',
        is_active:true,
        image:'',
        parent_id:''
    }
    const [form, setForm] = useState(payload?payload:editBanner)
    const [selectedImage, setSelectedImage] = useState(payload.image != ''?payload.image:'');
    const fileUploadRef = useRef();
    const HandleChange = (e)=>{
       const {name,value,files} = e.target;
       if(name === 'image' && e.target.files){
        const uploadedFile = fileUploadRef.current.files[0];
        const cachedURL = URL.createObjectURL(uploadedFile);
        const formData = new FormData();
        formData.append("file", uploadedFile);
        formData.append("name", form.name);
        formData.append("label", form.label);
        formData.append("weight_id", form.weight);
        formData.append("is_active", form.is_active);
        setSelectedImage(cachedURL)
        console.log(formData, 'formData')
        setForm(formData);
       }else{
            let isValid = isAllowed(value, name);
            if (isValid) {
                setForm({ ...form, [name]: value });
            }
       }
    }

    const isAllowed = (value, type) => {
        switch (type){
          case 'name':
            return (value === '' || (Validation.validateChar(value) && value.length < 51)); 
          case 'NewUrl':
          case 'is_active':
            return  true;
          default:
            return  true;
        }
      }
    setPayload(form);
  return (
    <>
    <div className="modal fade bs-example-modal-lg show" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-modal="true" style={{display: 'block'}}>
        <div className="modal-dialog modal-lg">
            <div className="modal-content">
                <div className="modal-header">
                    <h6 className="modal-title mt-0" id="myLargeModalLabel">Add New Banner</h6>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>setEditBanner(false)}></button>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="col-md-12">
                                    <label className="form-label" htmlFor="LeadName">Name</label>
                                    <input type="text" className="form-control" id="LeadName" name='name' value={form.name} required="" onChange={(e)=>HandleChange(e)}/>
                                </div>
                                <div className="col-md-12">
                                    <label className="form-label mt-2 mt-md-0" htmlFor="label">label</label>
                                    <input type="text" className="form-control" id="label" name='label' disabled={false} value={form.label} required="" onChange={(e)=>HandleChange(e)}/>
                                </div>
                                {/* <div className="col-md-12">
                                    <label className="form-label mt-2 mt-md-0" htmlFor="weight">Measurement Manage</label>
                                    <select className='form-select' name='weight' id='weight' onChange={(e)=>HandleChange(e)}>
                                        <option>Select</option>
                                        {
                                            meashuMaster.map((item,id)=>(
                                                <option key={id} value={item.id} selected = {form.weight === item.name ?'selected':''}>{item.name}</option>
                                            ))
                                        }
                                        
                                    </select>
                                </div> */}
                                <div className="col-md-12">
                                    <label className="form-label mt-2" htmlFor="PhoneNo">Banner Status</label><br/>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="is_active" id="inlineRadio1" checked={form.is_active ==1?true:false} value="1" onChange={(e)=>HandleChange(e)}/>
                                        <label className="form-check-label" htmlFor="inlineRadio1">Active</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="is_active" id="inlineRadio2" checked={form.is_active ==0?true:false} value="0" onChange={(e)=>HandleChange(e)}/>
                                        <label className="form-check-label" htmlFor="inlineRadio2">in Active</label>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="status-select" className="form-label mt-2">Upload Image</label>
                                    <div className="input-group mb-3">
                                        <input type="file" className="form-control"  name='image' id="inputGroupFile02" ref={fileUploadRef} onChange={(e)=>HandleChange(e)}/>
                                    </div>
                                </div> 
                            </div>
                            <div className="col-md-6">
                                <label className="form-label mt-2" htmlFor="PhoneNo">Banner Preview</label>
                                <figure className='img-container'>
                                    <img src={`${selectedImage}`} className='img-responsive'/>
                                </figure>
                            </div>
                        </div> 
                        <button type="button" className="btn btn-sm btn-primary mt-2" onClick={()=>bannerFunction()}>Save</button>            
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div className='modal-backdrop fade show'></div>
    </>
  )
}
