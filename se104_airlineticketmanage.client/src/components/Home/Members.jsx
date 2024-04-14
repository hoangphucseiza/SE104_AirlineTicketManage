import React, { useState } from "react";

const Members = () => {
  const [members, setMembers] = useState([
    {
      name: "Nguyễn Hoàng Việt",
      position: "Adminstrator",
      avatar:
        "https://i.pinimg.com/564x/3b/2b/6e/3b2b6ec605e46983f941f5b0484a0e2c.jpg",
      active: true,
    },
    {
      name: "Nguyễn Hoàng Phúc",
      position: "CEO",
      avatar:
        "https://i.pinimg.com/564x/49/ba/6b/49ba6b640c5c47618b987c1a518a0339.jpg",
      active: true,
    },
    {
      name: "N.V Quốc Thanh",
      position: "Co-Founder",
      avatar:
        "https://i.pinimg.com/564x/fa/8f/e3/fa8fe3ce41fc968f5c1fb111f506685d.jpg",
      active: true,
    },
    {
      name: "N.T Bích Hảo",
      position: "Customer Support",
      avatar:
        "https://i.pinimg.com/736x/2d/8c/04/2d8c04ad06381d630a40e8d134400f65.jpg",
      active: true,
    },
    {
      name: "Phạm Nhật Quang",
      position: "Staff",
      avatar:
        "https://i.pinimg.com/736x/6b/e7/af/6be7af73c46672a3f3c9a60e50ce7611.jpg",
      active: true,
    },
  ]);

  return (
    <div className="members">
      <div className="members_header">
        <h5 className="mb-3">Dreamers Team</h5>
        <i className="fa-solid fa-ellipsis" />
      </div>

      <div className="members_list">
        {members.map((member, index) => (
          <div key={index} className="members_list_item">
            <img src={member.avatar} alt="Avatar" />
            <div
              style={{
                flex: 1,
              }}
            >
              <h6>{member.name}</h6>
              <span>{member.position}</span>
            </div>
            <div className="member_list_item_status">
              <span>Đang làm việc</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Members;
