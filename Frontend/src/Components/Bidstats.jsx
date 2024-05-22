import React from 'react'
import Chart from "./Chart"

function Bidstats() {
  return (
    <div>
        <table className="zebra-table">
                              <thead>
                                <tr>
                                  <th>Bid Number</th>
                                  <th>Amount</th>
                                  <th>User</th>
                                </tr>
                              </thead>
                              <tbody>
                                {allBids.slice().map((bid, index) => (
                                  <tr key={index}>
                                    <td>{allBids.length - index}</td>
                                    <td>₹{bid.amount}</td>
                                    <td>{bid.userbid_no}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>



                            <Chart/>

      
    </div>
  )
}

export default Bidstats
