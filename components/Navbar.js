
import { useState, useEffect, useContext } from "react"
import { Menu } from "antd"
import Link from "next/link" 
import {
    AppstoreAddOutlined,
    LoginOutlined,
    UserAddOutlined,
    UserOutlined,
    CustomerServiceOutlined,
    SnippetsOutlined,
    LogoutOutlined,
    CoffeeOutlined,
    CarryOutOutlined,
    TeamOutlined
} from "@ant-design/icons" 
import { Context } from '../context' 
import axios from "axios" 
import { toast } from "react-toastify"
import { useRouter } from "next/router"
// import SubMenu from "antd/es/menu/SubMenu"

const { Item, SubMenu, ItemGroup } = Menu  

const Navbar = ()=>{
    const [current, setCurrent] = useState('') 

    const {state, dispatch} = useContext(Context) 
    const {user} = state;
    const router = useRouter()

    useEffect(()=> {
        process.browser && setCurrent(window.location.pathname) 
    }, [process.browser && window.location.pathname]) 

    const logout = async()=>{
        dispatch({type: "LOGOUT"})
        window.localStorage.removeItem("user") 

        const {data} = await axios.get('/api/logout') 
        toast(data.message) 
        router.push('/')
    }

    return(
        <Menu 
            // theme="dark"
            mode="horizontal" 
            selectedKeys={[current]} 
            className="mb-2"
        >
            <Item key='/'
            onClick={(e)=> setCurrent(e.key)}
            icon={<AppstoreAddOutlined/>}
            >
                <Link href="/">
                    EagleEye-FX
                </Link>
            </Item> 

            {/* <Item key='/about' 
            onClick={(e)=> setCurrent(e.key)}
            icon={<UserOutlined/>}>
                <Link href="/about">
                    About Us 
                </Link>
            </Item> */}

            {/* <Item key='/contact' 
            onClick={(e)=> setCurrent(e.key)}
            icon={<CustomerServiceOutlined/>}>
                <Link href="/contact">
                    Contact Us 
                </Link>
            </Item> */}

            {/* <Item key='/blog' 
            onClick={(e)=> setCurrent(e.key)}
            icon={<SnippetsOutlined />}>
                <Link href="/blog">
                    Blog 
                </Link>
            </Item> */}

            {user && user.role && user.role.includes("Instructor") ? (
                <Item key='/instructor/course/create' 
                    onClick={(e)=> setCurrent(e.key)}
                    icon={<CarryOutOutlined/>}
                    style={{ float: "right" }}
                 >
                    <Link href="/instructor/course/create">
                        Create course 
                    </Link>        
                </Item>
            ) : (
                <Item key='/user/become-instructor' 
                    onClick={(e)=> setCurrent(e.key)}
                    icon={<TeamOutlined/>} 
                    style={{ float: "right" }}
                 >
                    <Link href="/user/become-instructor">
                        Become Instructor 
                    </Link>
                </Item>
            )} 

            

           {user === null && (
                <>
                    <Item key='/login' 
                        onClick={(e)=> setCurrent(e.key)}
                        icon={<LoginOutlined/>}
                        style={{ float: "right" }}
                    >
                        <Link href="/login">
                            Login 
                        </Link>
                    </Item>

                    <Item key='/register' 
                        onClick={(e)=> setCurrent(e.key)}
                        icon={<UserAddOutlined/>}
                        style={{ float: "right" }}
                    >
                        <Link href="/register">
                            Register 
                        </Link>
                    </Item> 
                </>
           )}

            {user && user.role && user.role.includes("Instructor") && (
                <Item key='/instructor' 
                onClick={(e)=> setCurrent(e.key)}
                icon={<TeamOutlined/>} 
                style={{ float: "right" }}
                >
                <Link href="/instructor"> 
                    Instructor 
                </Link>
                </Item>
            )}

            {user !== null && (
                <SubMenu icon={<CoffeeOutlined/>} title={user && user.name} className="float-right">
                    <ItemGroup> 
                        {/* <Item key="dashboard">

                        </Item> */}
                        <Item key="user">
                            <Link href="/user">Dashboard</Link>
                        </Item>
                        <Item 
                            onClick={logout}
                            icon={<LogoutOutlined/>}
                            style={{ float: "right" }}
                            >                 
                            Logout
                        </Item> 
                    </ItemGroup>
                </SubMenu>
            )}

            
        </Menu>
    )
}

export default Navbar
