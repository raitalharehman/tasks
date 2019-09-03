import React from 'react';
import Company from '../../components/Company';
import WorkCentre from '../../components/Company/workcentre';
import './scss/index.scss';

function CompanyPage() {
    return (
        <div className="company-root container-fluid">
            <div className="row">
                <div className="col-4 col-p-05">
                    <WorkCentre />
                </div>
                <div className="col-8 col-p-05">
                    <Company />
                </div>
            </div>
        </div>
    );
}

export default CompanyPage;
