import React, { useEffect } from 'react'
import ListTicket from '../../components/Ticket/ListTicket'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { TICKET_EXAMPLES } from "../../utils/TicketExample";

const Tickets = () => {
  const [tickets,setTickets] = useState(TICKET_EXAMPLES);
  const [sortValue,setSortValue] =  useState("Default");
  const [listTicket,setListTicket] = useState([]);

  useEffect(()=>{
    setListTicket([...tickets]);
  },[tickets]);

  useEffect(()=>{
    switch (sortValue) {
      case 'ASC':
        setListTicket((prev) =>
          [...prev].sort((a, b) => a.TiLe - b.TiLe)
        );
        break;
      case 'DESC':
        setListTicket((prev) =>
          [...prev].sort((a, b) => b.TiLe - a.TiLe)
        );
        break;
      default:
        setListTicket([...tickets]);
    }
    
  },[sortValue]);
  // console.log(TICKET_EXAMPLES); 
  // console.log(listTicket);
  return <>
    <div className="mb-4 table">
      <div className="box_shadow mb-3 table_container">
        <div className="mb-3 ">
          <div className="d-flex justify-content-between align-items-center mb-3 ">
            <h5>Danh sách Hạng vé</h5>
            <div className="d-flex align-items-center gap-4">
              <form
                className="d-flex justify-content-between align-items-center table_search"
                
              >
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
                  pathname: "/airports/add",
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
          <ListTicket listTicket={listTicket} sortValue={sortValue} setSortValue={setSortValue} />
        </div>
      </div>
      {/*pagination */}
      {/* <div className="d-flex justify-content-between align-items-center ">
        <p>
          Hiển thị {(page - 1) * 10 + 1} đến {page * 10} trong tổng số{" "}
          {pages.length * 10} sân bay
        </p>
        <div className="pagination">
          <button
            className="btn btn_page"
            disabled={page <= 1 && true}
            onClick={() => setPage(page - 1)}
          >
            Trước
          </button>
          {pages.map((id) => (
            <button
              key={id}
              className={`btn btn_page ${id === page ? "active" : ""} `}
              onClick={() => setPage(id)}
            >
              {id}
            </button>
          ))}
          <button
            className="btn btn_page"
            disabled={page >= pages.length && true}
            onClick={() => setPage(page + 1)}
          >
            Sau
          </button>
        </div>
      </div> */}
    </div>
  </>
}

export default Tickets
