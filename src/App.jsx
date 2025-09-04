import React, { useState } from "react";
import { identityOptions, jobOptions, payments } from "../src/constants/option";
import { getDistricts } from "./services/locationService";
import provincesData from "./data/province_districts.json";

export default function App() {
  const [districts, setDistricts] = useState([]);
  const [leader, setLeader] = useState({
    name: "",
    birthdate: "",
    id_gender: "1",
    id_identity: "1",
    identity_no: "",
    address: "",
    id_province: "",
    id_district: "",
    hp: "",
    bank: "qris",
    termsCheckbox: "on",
    pendamping: "1",
    organisasi: ""
  });

  const [members, setMembers] = useState([
    {
      nama: "",
      birthdate: "",
      id_gender: "1",
      alamat: "",
      id_identity: "1",
      identity_no: "",
      hp_member: "",
      hp_keluarga: "",
      id_job: "1",
    },
  ]);

  // handle perubahan input leader
  const handleLeaderChange = (e) => {
    const { name, value } = e.target;
    setLeader((prev) => ({ ...prev, [name]: value }));
    console.log("ini ada yang maru berubah:");
    console.log(e);
    console.log("name:", name);
    console.log('value:', value);

  };

  // handle perubahan input member
  const handleMemberChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...members];
    updated[index][name] = value;
    setMembers(updated);
    console.log("anjing");
    console.log(e.target);
    console.log('ini name: ', name);
    console.log('ini vale:', value);

  };

  // ambil districts sesuai province terpilih
  const currentDistricts =
    provincesData.find((p) => p.province_id === leader.id_province)
      ?.districts || [];


  const handleProvinceChange = async (e) => {
    const { name, value } = e.target;
    handleLeaderChange(e);
    if (value) {
      const dists = getDistricts(value);
      setDistricts(dists);

    } else {
      setDistricts([]);
    }
  };

  // tambah member baru
  const addMember = () => {
    setMembers([
      ...members,
      {
        nama: "",
        birthdate: "",
        id_gender: "1",
        alamat: "",
        id_identity: "1",
        identity_no: "",
        hp_member: "",
        hp_keluarga: "",
        id_job: "1",
      },
    ]);
  };

  // export JSON
  const handleSubmit = () => {
    const data = {
      leader,
      member: members,
    };
    const blob = new Blob([JSON.stringify(data, null, 4)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "formData.json";
    link.click();
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Form Ketua</h1>
      <div className="grid gap-2 mb-6">

        {/* Dropdown Pendamping */}
        <label className="font-medium">Pendamping</label>
        <select
          className="border p-2 rounded"
          name="pendamping"
          value={leader.pendamping}
          onChange={handleLeaderChange}
        >
          <option value="1">Pakai Pendamping</option>
          <option value="0">Tanpa Pendamping</option>
        </select>

        {/* Input Organisasi hanya muncul kalau pendamping = 0 */}
        {leader.pendamping === "0" && (
          <input
            className="border p-2 rounded"
            type="text"
            name="organisasi"
            placeholder="Nama Organisasi"
            value={leader.organisasi}
            onChange={handleLeaderChange}
          />
        )}
      </div>
      <div className="grid gap-2 mb-6">
        <input
          className="border p-2 rounded"
          type="text"
          name="name"
          placeholder="Nama Ketua"
          value={leader.name}
          onChange={handleLeaderChange}
        />
        <input
          className="border p-2 rounded"
          type="date"
          name="birthdate"
          value={leader.birthdate}
          onChange={handleLeaderChange}
        />
        <select
          className="border p-2 rounded"
          name="id_gender"
          value={leader.id_gender}
          onChange={handleLeaderChange}
        >
          <option value="1">Laki-laki</option>
          <option value="2">Perempuan</option>
        </select>
        {/* Jenis Identitas Leader */}
        <label className="font-medium">Jenis Identitas</label>
        <select
          className="border p-2 rounded"
          name="id_identity"
          value={leader.id_identity}
          onChange={handleLeaderChange}
        >
          {identityOptions.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.name}
            </option>
          ))}
        </select>
        <input
          className="border p-2 rounded"
          type="text"
          name="identity_no"
          placeholder="Nomor Identitas"
          value={leader.identity_no}
          onChange={handleLeaderChange}
        />
        <input
          className="border p-2 rounded"
          type="text"
          name="address"
          placeholder="Alamat"
          value={leader.address}
          onChange={handleLeaderChange}
        />
        {/* Dropdown Provinsi (statis) */}
        <select
          className="border p-2 w-full"
          value={leader.id_province}
          name="id_province"
          onChange={handleProvinceChange}
        >
          <option value="">Pilih Provinsi</option>
          {provincesData.map((p) => (
            <option key={p.province_id} value={p.province_id}>
              {p.province_name}
            </option>
          ))}
        </select>

        {/* Dropdown District (dinamis sesuai provinsi) */}
        <select
          className="border p-2 w-full"
          value={leader.id_district}
          name="id_district"
          onChange={handleLeaderChange}
          disabled={!districts.length}
        >
          <option value="">Pilih District</option>
          {currentDistricts.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
        <input
          className="border p-2 rounded"
          type="text"
          name="hp"
          placeholder="Nomor HP"
          value={leader.hp}
          onChange={handleLeaderChange}
        />
      </div>

      <h1 className="text-2xl font-bold mb-4">Form Anggota</h1>
      {members.map((member, index) => (
        <div key={index} className="border p-4 rounded mb-4">
          <h2 className="font-semibold">Anggota {index + 1}</h2>
          <div className="grid gap-2">
            <input
              className="border p-2 rounded"
              type="text"
              name="nama"
              placeholder="Nama"
              value={member.nama}
              onChange={(e) => handleMemberChange(index, e)}
            />
            <input
              className="border p-2 rounded"
              type="date"
              name="birthdate"
              value={member.birthdate}
              onChange={(e) => handleMemberChange(index, e)}
            />
            <select
              className="border p-2 rounded"
              name="id_gender"
              value={member.id_gender}
              onChange={(e) => handleMemberChange(index, e)}
            >
              <option value="1">Laki-laki</option>
              <option value="2">Perempuan</option>
            </select>
            <input
              className="border p-2 rounded"
              type="text"
              name="alamat"
              placeholder="Alamat"
              value={member.alamat}
              onChange={(e) => handleMemberChange(index, e)}
            />
            {/* Jenis Identitas */}
            <select
              className="border p-2 rounded w-full mb-2"
              value={member.id_identity}
              name="id_identity"
              onChange={(e) =>
                handleMemberChange(index, e)
              }
            >
              {identityOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.name}
                </option>
              ))}
            </select>
            <input
              className="border p-2 rounded"
              type="text"
              name="identity_no"
              placeholder="Nomor Identitas"
              value={member.identity_no}
              onChange={(e) => handleMemberChange(index, e)}
            />
            <input
              className="border p-2 rounded"
              type="text"
              name="hp_member"
              placeholder="HP Member"
              value={member.hp_member}
              onChange={(e) => handleMemberChange(index, e)}
            />
            <input
              className="border p-2 rounded"
              type="text"
              name="hp_keluarga"
              placeholder="HP Keluarga"
              value={member.hp_keluarga}
              onChange={(e) => handleMemberChange(index, e)}
            />
            {/* Pekerjaan */}
            <select
              className="border p-2 rounded w-full mb-2"
              value={member.id_job}
              name="id_job"
              onChange={(e) => handleMemberChange(index, e)}
            >
              {jobOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}
      {/* Dropdown Payment */}
      <select
        className="border p-2 mr-3"
        value={leader.bank}
        name="bank"
        onChange={handleLeaderChange}
      >
        <option value="">Pilih Metode Pembayaran</option>
        {payments.map((p) => (
          <option key={p.id} value={p.name}>
            {p.name}
          </option>
        ))}
      </select>

      <button
        onClick={addMember}
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
      >
        Tambah Anggota
      </button>

      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Export JSON
      </button>
    </div>
  );
}
