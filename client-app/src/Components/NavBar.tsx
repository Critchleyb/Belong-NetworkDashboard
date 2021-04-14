import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { DropdownItemProps, Form, Select } from "semantic-ui-react";
import { history } from "../index";
import client from "../API/client";
import Store from "../interfaces/StoreInterface";

export default function NavBar() {
  const [selectedArena, setSelectedArena] = useState<any | null>(null);
  const [selectOptions, setSelectOptions] = useState<DropdownItemProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  //Get Dropdown Options from Back-End
  useEffect(() => {
    async function getStores() {
      //Get Stores from Server
      const response = await client.store.get();
      const stores: Store[] = response.data;

      //Create Select options array
      const selectoptions: DropdownItemProps[] = stores.map((el) => {
        return new Object({
          key: el.storeNumber,
          value: el.storeNumber,
          text: `${el.storeNumber} - ${el.name}`,
        });
      });

      selectoptions.sort((a, b) => {
        if (a.value! < b.value!) return -1;
        else return 1;
      });

      // selectoptions.sort((a, b) => a - b.value);

      //Set state and stop loading
      setSelectOptions(selectoptions);
      setLoading(false);
    }
    getStores();
  }, []);

  //Push to new page from selects onchange property
  function handleSelectChange(id: any) {
    if (id === "") {
      history.push("/");
      setSelectedArena(null);
      return;
    }
    setSelectedArena(id);
    history.push(`/network/${id}`);
  }

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        backgroundColor: "#2f3640",
        borderBottom: "1px solid white",
        alignItems: "center",
        padding: "1rem 2rem",
      }}
    >
      <Link
        to="/"
        style={{
          verticalAlign: "center",
          margin: "0 auto 0 0",
        }}
        onClick={() => setSelectedArena(null)}
      >
        <h1>Belong Arena Network Dashboard</h1>
      </Link>
      <Select
        clearable
        search
        loading={loading}
        disabled={loading}
        placeholder="Select Your Arena"
        options={selectOptions}
        onChange={(event, data) => handleSelectChange(data.value)}
        value={selectedArena}
      />
    </div>
  );
}
