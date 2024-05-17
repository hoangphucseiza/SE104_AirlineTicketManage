import { Link } from "react-router-dom";
import { useState } from "react";


const ListTicket = ({listTicket, sortValue, setSortValue}) =>{
    const [classNameSort, setClassNameSort] = useState("fa-solid fa-sort ms-1");
    const changeArrow = (sortValue, setSortValue) =>{
        if (sortValue === "ASC"){
            setSortValue("DESC");
            setClassNameSort("fa-solid fa-arrow-up ms-1");
        } else if (sortValue === "DESC"){
            setSortValue("Default");
            setClassNameSort("fa-solid fa-sort ms-1");
        } else {
            setSortValue("ASC");
            setClassNameSort("fa-solid fa-arrow-down ms-1");
        }
    }
    return <>
        <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Mã Hạng vé</th>

          <th
            scope="col"
          >
            Tên Hạng vé
          </th>

          <th
            scope="col"
            style={{
              cursor: "pointer",
            }}
            onClick={()=>{changeArrow(sortValue,setSortValue)}}
          >
            Tỉ lệ Hạng Vé
            <i className={classNameSort}></i>          
            </th>

          <th scope="col" colSpan={2}></th>
        </tr>
      </thead>
      <tbody>
        {listTicket.map((t, index)=> (
            <tr key={index}>
                <td>{index+1}</td>
                <td>{t.MaHV}</td>
                <td>{t.HangVe}</td>
                <td>{t.TiLe}</td>
                <td colSpan={2} style =  {{textAlign: 'center'}}>
                <Link
                to={`/tickets/update/${t.MaHV}`}
                className="btn btn_table btn_edit  me-4"
              >
                <i className="fa-regular fa-pen-to-square" />
                Sửa hạng vé
              </Link>
                </td>
            </tr>
        ))}

        
      </tbody>
    </table>
    </> 
}

export default ListTicket;