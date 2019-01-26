import React, { Component } from 'react';

class Table extends Component {
   render() {
      console.log(this.props)
      return (
         <table>
            <thead>
            <th>ID</th>
            <th>Nama</th>
            <th>Kelas</th>
            </thead>
            <tbody>
            {
               this.props.siswa.map((data, index) => {
                  return (
                  <tr key = {index}>
                     <td>{ data.id }</td>
                     <td>{ data.nama }</td>
                     <td>{ data.kelas }</td>
                  </tr>
                  )
               })
            }
            </tbody>
            <p> { this.props.judulBaru } </p>
         </table>
         
      )
   }
}

// DENGAN FUNCTION COMPONENT
// const Table = (props) => {
//    return (
//       <table>
//          <thead>
//          <th>ID</th>
//          <th>Nama</th>
//          <th>Kelas</th>
//          </thead>
//          <tbody>
//          {
//             props.siswa.map((data, index) => {
//                return (
//                <tr key = {index}>
//                   <td>{ data.id }</td>
//                   <td>{ data.nama }</td>
//                   <td>{ data.kelas }</td>
//                </tr>
//                )
//             })
//          }
//          </tbody>
//       </table>
//    )
// }

export default Table;