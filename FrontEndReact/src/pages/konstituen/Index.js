import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Konstituen extends Component {
   constructor() {
      super()
      this.state = {
         konstituens : []
      }
   }

   componentDidMount() {
      this._getDataKonstituen();
   }

   _getDataKonstituen = () => {
      const token = localStorage.getItem('token')
      const headers = {
         token : token
      }
      axios.get('http://localhost:5000/konstituens', { headers })
         .then(res => {
            // console.log(res)
            this.setState({ konstituens : res.data.data })
         })
         .catch(err => console.log(err))
   }

   _handleDelete = (id, nama) => {
      // alert(id)
      const token = localStorage.getItem('token')
      const headers = {
         token : token
      }
      const deletedNama = nama;
      axios.delete(`http://localhost:5000/konstituens/${id}`, { headers })
         .then(res => {
            alert(`Berhasil hapus data konstituen dengan nama ${deletedNama}`)
            this._getDataKonstituen();
         })
         .catch(err => console.log(err));
   }

   _handleEdit = (id) => {
      // console.log(this.props)
      this.props.history.push(`/konstituen/edit/${id}`)
      
   }

   render() {
      return (
         <div>
            <h1>Data Konstituen</h1>
            <Link to = '/konstituen/create' className="btn btn-primary">Add Konstituen</Link>
            <table className="table">
               <thead>
                  <th>Nama</th>
                  <th>NIK</th>
                  <th>Alamat</th>
                  <th>Kecamatan</th>
                  <th>Kelurahan</th>
                  <th>Nomor TPS</th>
                  <th>ACTIONS</th>
               </thead>
               <tbody>
                  {
                     this.state.konstituens.map((data, index) => {
                        return (
                           <tr key = { index }>
                              <td>{ data.nama }</td>
                              <td>{ data.nik }</td>
                              <td>{ data.alamat }</td>
                              <td>{ data.Kecamatan.kecamatan }</td>
                              <td>{ data.Kelurahan.kelurahan }</td>
                              <td>{ data.tps }</td>
                              <td>
                                 <button 
                                    onClick = { () => this._handleEdit(data.id) }
                                    className="btn btn-outline-info">EDIT
                                 </button>
                                 <button 
                                    onClick = { (e) => 
                                       window.confirm("Are you sure you wish to delete this item?") &&
                                       this._handleDelete(data.id, data.nama) }
                                    className="btn btn-outline-danger">DELETE
                                 </button>
                              </td>
                           </tr>
                        )
                     })
                  }
               </tbody>
            </table>
         </div>
      )
   }
}

export default Konstituen;