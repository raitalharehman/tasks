import React from 'react';
import './scss/index.scss';
import { Sale } from '../../components';
import WorkCentreSale from '../../components/Sale/workcentre';

function SalePage() {
    return (
        <div className="sale-root container-fluid">
            <div className="row">
                <div className="col-4 col-p-05">
                    <WorkCentreSale />
                </div>
                <div className="col-8 col-p-05">
                    <Sale />
                </div>
            </div>
        </div>
    );
}

export default SalePage;
