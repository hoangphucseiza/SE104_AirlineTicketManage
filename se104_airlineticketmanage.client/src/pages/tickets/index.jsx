import React, { useEffect, useState } from "react";
import ListTicket from "../../components/Ticket/ListTicket";
import { Link } from "react-router-dom";
import { getDataAPI } from "../../utils/fetchData";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [sortValue, setSortValue] = useState("Default");
  const [listTicket, setListTicket] = useState([]);

  useEffect(() => {

    const getTickets = async () => {
      try {
        const res = await getDataAPI("api/HangVe/GetDanhSachHangVe");

        const data = res.data["$values"].map((item) => ({
          MaHV: item.maHV,
          HangVe: item.tenHV,
          TiLe: item.tiLe_Gia,
        }));

        setTickets(data);
        setListTicket(data);
      } catch (error) {
        console.error(error);
      }
    };

    getTickets();
  }, [tickets]);

  useEffect(() => {
    switch (sortValue) {
      case "ASC":
        setListTicket((prev) => [...prev].sort((a, b) => a.TiLe - b.TiLe));
        break;
      case "DESC":
        setListTicket((prev) => [...prev].sort((a, b) => b.TiLe - a.TiLe));
        break;
      default:
        setListTicket([...tickets]);
    }
  }, [sortValue]);

  if(tickets.length === 0) return null;

  return (
    <>
      <div className="mb-4 table">
        <div className="box_shadow mb-3 table_container">
          <div className="mb-3 ">
            <div className="d-flex justify-content-between align-items-center mb-3 ">
              <h5>Danh sách Hạng vé</h5>
              <div className="d-flex align-items-center gap-4">
                <form className="d-flex justify-content-between align-items-center table_search">
                  <input
                    type="text"
                    placeholder="Tìm kiếm hạng vé..."
                    className="form-control me-2"
                    // value={search}
                    // onChange={(e) => setSearch(e.target.value)}
                  />
                  <i className="fa-solid fa-magnifying-glass" />
                </form>
                <Link
                  to={{
                    pathname: "/tickets/add",
                  }}
                  className="btn btn_table btn_add"
                >
                  <i className="fa-solid fa-plus" />
                  Thêm Hạng Vé
                </Link>
              </div>
            </div>
            <div className="d-flex justify-content-between mb-3 ">
              {/* <Filter filter={filter} setFilter={setFilter} /> */}
            </div>
          </div>
          <div className="mb-3">
            <ListTicket
              listTicket={listTicket}
              sortValue={sortValue}
              setSortValue={setSortValue}
            />
          </div>
        </div>
                  
      </div>
    </>
  );
};

export default Tickets;
