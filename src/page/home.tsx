import {
  Breadcrumb,
  Layout,
  LayoutContent,
  LayoutFooter,
  LayoutHeader,
  LayoutSider,
  Menu,
  MenuItem,
} from 'ant-design-vue';
import { defineComponent, h } from 'vue';
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons-vue';
import { breadcrumb, navRouter } from '../route/index';
import './home.less';

const Home = () => {
  const onCollapse = (collapsed: boolean, type: string) => {
    console.log(collapsed, type);
  };

  const onBreakpoint = (broken: boolean) => {
    console.log(broken);
  };
  return () => (
    <Layout class="layout">
      <LayoutSider
        class="layout-sider"
        breakpoint="lg"
        collapsed-width="0"
        onCollapse={onCollapse}
        onBreakpoint={onBreakpoint}
      >
        <div class="logo" />
        <Menu theme="dark" mode="inline">
          {navRouter.map((p, index) => (
            <router-link to={p.to}>
              <MenuItem key={index}>
                {h(p.name)}
                <span class="nav-text">{p.name}</span>
              </MenuItem>
            </router-link>
          ))}
        </Menu>
      </LayoutSider>
      <Layout>
        <LayoutHeader class="layout-header" />
        <LayoutContent class="layout-content">
          <Breadcrumb routes={breadcrumb} />
          <router-view />
        </LayoutContent>
        <LayoutFooter style="text-align: center">Ant Design ©2018 Created by Ant UED</LayoutFooter>
      </Layout>
    </Layout>
  );
};

export default defineComponent(Home);
