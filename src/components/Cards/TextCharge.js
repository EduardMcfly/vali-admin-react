import React from 'react';

class TextCharge extends React.Component {
  render() {
    return (
      <div className="align-items-center">
        <div>
          <div className="row text-center">
            <div
              className="m-loader mr-2 mx-auto"
              style={{ width: '20%' }}
            >
              <svg className="m-circular" viewBox="25 25 50 50">
                <circle
                  className="path"
                  cx="50"
                  cy="50"
                  r="20"
                  fill="none"
                  strokeWidth="4"
                  strokeMiterlimit="10"
                />
              </svg>
            </div>
            <div className="col-12" />
            <div className="col-12" />
          </div>
        </div>
      </div>
    );
  }
}

export default TextCharge;
