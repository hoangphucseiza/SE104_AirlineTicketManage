const RoutesName={
    '':{
        path:'/',
        name:'Trang chủ',
    },
    'airports':{
        path:'/airports',
        name:'Sân bay',
        sub_paths:{
            'add': 'Thêm sân bay',
            'update':'Chỉnh sửa sân bay'
        }
    },
    'schedules':{
        path:'/schedules',
        name:'Lịch chuyến bay',
        sub_paths:{
            'add': 'Tạo lịch chuyến bay',
            'update':'Chỉnh sửa lịch chuyến bay'
        }
    },
    'booking':{
        path:'/booking',
        name:'Đặt vé',
        sub_paths:{
            'find': 'Tìm chuyến bay',
            'ticket':'Thông tin đặt vé'
        }
    },
    'tickets':{
        path:'/tickets',
        name:'Danh mục hạng vé',
        sub_paths:{
            'add': 'Thêm hạng vé',
            'update':'Chỉnh sửa hạng vé'
        }
    },
    'report':{
        path:'/report',
        name:'Báo cáo thống kê',
        sub_paths:{
        }
    },
    'customers':{
        path:'/customers',
        name:'Chăm sóc khách hàng',
        sub_paths:{
           'view':'Thông tin khách hàng '
        }
    }
}

export default RoutesName;