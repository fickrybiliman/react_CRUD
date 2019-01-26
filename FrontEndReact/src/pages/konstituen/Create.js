import React, { Component } from 'react';
import axios from 'axios';
import FormErrors from '../../components/FormErrors';

class KonstituenCreate extends Component {
  constructor() {
    super()

    this.state = {
      nama : '',
      nik : '',
      hp : '',
      alamat : '',
      kecamatanID : '',
      kelurahanID : '',
      tps : '',
      formErrors : { nama : '', nik : '', hp : '', alamat : '', kecamatanID : '', kelurahanID : '', tps : ''},
      namaValid : false,
      nikValid : false,
      hpValid : false,
      alamatValid : false,
      kecamatanIDValid : false,
      kelurahanIDValid : false,
      tpsValid : false,
      formValid : false
    }
  }

  _handleSubmit = (e) => {
    const token = localStorage.getItem('token')
    const headers = {
        token : token
    }
    const { nama, nik, hp, alamat, kecamatanID, kelurahanID, tps } = this.state
    axios.post('http://localhost:5000/konstituens', { nama, nik, hp,  alamat, kecamatanID, kelurahanID, tps}, { headers })
      .then(res => {
        // console.log(res)
        // Cara redirect react router
        this.props.history.push('/konstituen')
      }).catch(err => console.log(err))
    
    // Untuk mencegah Submit merefresh page, karena default habit nya submit akan langsung merefresh page  
    e.preventDefault()
  }

  _handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [e.target.name] : e.target.value }, () => {this._validateField(name, value)} )
  }

  // Validasi Form Input
  _validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let namaValid = this.state.nama;
    let nikValid = this.state.nik;
    let hpValid = this.state.hp;
    let alamatValid = this.state.alamat;
    let kecamatanIDValid = this.state.kecamatanID;
    let kelurahanIDValid = this.state.kelurahanID;
    let tpsValid = this.state.tps;

    switch(fieldName) {
      case 'nama' :
        namaValid = value.length > 2;
        fieldValidationErrors.nama = namaValid ? '' : ' Terlalu Singkat';
        break;
      case 'nik' :
        nikValid = value.length === 16;
        fieldValidationErrors.nik = nikValid ? '' : ' Harus 16 Digit';
        break;
      case 'hp' :
        hpValid = value.length > 10;
        fieldValidationErrors.hp = hpValid ? '' : ' Terlalu Singkat';
        break;
      case 'alamat' :
        alamatValid = value.length > 7;
        fieldValidationErrors.alamat = alamatValid ? '' : ' Terlalu Singkat';
        break;
      case 'kecamatanID' :
        kecamatanIDValid = value.length >= 1;
        fieldValidationErrors.kecamatanID = kecamatanIDValid ? '' : ' Harus Di isi';
        break;
      case 'KelurahanID' :
        kelurahanIDValid = value.length >= 1;
        fieldValidationErrors.kelurahanID = kelurahanIDValid ? '' : ' Harus Di isi';
        break;
      case 'tps' :
        tpsValid = value.length >= 1;
        fieldValidationErrors.tps = tpsValid ? '' : ' Harus Di isi';
        break;
      default:
        break;
    }

    this.setState({ formErrors : fieldValidationErrors,
                    namaValid : namaValid,
                    nikValid : nikValid,
                    hpValid : hpValid,
                    alamatValid : alamatValid,
                    kecamatanIDValid : kecamatanIDValid,
                    kelurahanIDValid : kelurahanIDValid,
                    tpsValid : tpsValid
                  }, this._validateForm );
  }

  _validateForm() {
    this.setState({ formValid : this.state.namaValid && this.state.nikValid 
                                && this.state.hpValid && this.state.alamatValid 
                                && this.state.kecamatanIDValid && this.state.kelurahanIDValid
                                && this.state.tpsValid })
  }

  _errorClass(error) {
    return (
      error.length === 0 ? '' : 'has-error'
    );
  }

  render() {
    return (
        <div>
          <h1>Tambah Konstituen</h1>
          <div className="panel panel-default">
            <FormErrors formErrors = { this.state.formErrors } />
          </div>
          <form onSubmit = { this._handleSubmit }>
            <div className="form-group">
              <label>Nama</label>
              <input 
                name="nama" 
                value = {this.state.nama} 
                onChange = { this._handleChange } 
                className="form-control"
              />
            </div>
            <div className={`form-group ${this._errorClass(this.state.formErrors.nama)}`}>
              <label>Nomor Induk Kependudukan</label>
              <input 
                name="nik" 
                value = {this.state.nik} 
                onChange = { this._handleChange } 
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Nomor Handphone</label>
              <input 
                name="hp" 
                value = {this.state.hp} 
                onChange = { this._handleChange } 
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Alamat</label>
              <input 
                name="alamat" 
                value = {this.state.alamat} 
                onChange = { this._handleChange } 
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Kecamatan</label>
              <input 
                name="kecamatanID" 
                value = {this.state.kecamatanID} 
                onChange = { this._handleChange } 
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Kelurahan</label>
              <input 
                name="kelurahanID" 
                value = {this.state.kelurahanID} 
                onChange = { this._handleChange } 
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Nomor TPS</label>
              <input 
                name="tps" 
                value = {this.state.tps} onChange = { this._handleChange } 
                className="form-control"
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={ !this.state.formValid } >SUBMIT</button>
          </form>
        </div>
    )
  }
}

export default KonstituenCreate;