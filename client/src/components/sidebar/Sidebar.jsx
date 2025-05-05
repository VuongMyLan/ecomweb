import React from 'react';
import { MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';
import { SidebarData } from './SidebarData';
import SubSidebar from './SubSidebar';
const Sidebar = ({ className, setShowWidget }) => {
    return (
        <div className={`${className}`}>
            {SidebarData.map((item, index) => (
                <SubSidebar
                    key={index}
                    item={item}
                    className='subItem__container'
					setShowWidget={setShowWidget}
                />
            ))}
        </div>
    );
};

export default Sidebar;
