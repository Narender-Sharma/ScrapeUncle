import React from 'react'

export const DashboardTop = () => {
  return (
    <div className="row justify-content-center">
        <div className="col-md-6 col-lg-3">
            <div className="card report-card">
                <div className="card-body">
                    <div className="row d-flex justify-content-center">
                        <div className="col">
                            <p className="text-dark mb-1 fw-semibold">Paper</p>
                            <h4 className="my-1">77</h4>
                            <p className="mb-0 text-truncate text-muted"><span className="text-success"><i className="mdi mdi-checkbox-marked-circle-outline me-1"></i></span>26 Project Complete</p>
                        </div>
                        <div className="col-auto align-self-center">
                            <div className="bg-light-alt d-flex justify-content-center align-items-center thumb-md  rounded-circle">
                                <i data-feather="layers" className="align-self-center text-muted icon-sm"></i>  
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
        <div className="col-md-6 col-lg-3">
            <div className="card report-card">
                <div className="card-body">
                    <div className="row d-flex justify-content-center">                                                
                        <div className="col">
                            <p className="text-dark mb-1 fw-semibold">Plastic</p>
                            <h4 className="my-1">41</h4>
                            <p className="mb-0 text-truncate text-muted"><span className="badge badge-soft-success">Active</span> Weekly Avg.Sessions</p>
                        </div>
                        <div className="col-auto align-self-center">
                            <div className="bg-light-alt d-flex justify-content-center align-items-center thumb-md  rounded-circle">
                                <i data-feather="check-square" className="align-self-center text-muted icon-sm"></i>  
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </div> 
        <div className="col-md-6 col-lg-3">
            <div className="card report-card">
                <div className="card-body">
                    <div className="row d-flex justify-content-center">
                        <div className="col">  
                            <p className="text-dark mb-1 fw-semibold">Metal</p>  
                            <h4 className="my-1">801:30</h4>   
                            <p className="mb-0 text-truncate text-muted"><span className="text-muted">01:33</span> / 
                                <span className="text-muted">9:30</span>  Duration</p>
                        </div>
                        <div className="col-auto align-self-center">
                            <div className="bg-light-alt d-flex justify-content-center align-items-center thumb-md  rounded-circle">
                                <i data-feather="clock" className="align-self-center text-muted icon-sm"></i>  
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </div> 
        <div className="col-md-6 col-lg-3">
            <div className="card report-card">
                <div className="card-body">
                    <div className="row d-flex justify-content-center">                                                
                        <div className="col">
                            <p className="text-dark mb-1 fw-semibold">E waste</p>
                            <h4 className="my-1">$24100</h4>   
                            <p className="mb-0 text-truncate text-muted"><span className="text-dark">$14k</span> Total used budgets</p>
                        </div>
                        <div className="col-auto align-self-center">
                            <div className="bg-light-alt d-flex justify-content-center align-items-center thumb-md  rounded-circle">
                                <i data-feather="dollar-sign" className="align-self-center text-muted icon-sm"></i>  
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </div> 
    </div>
  )
}
