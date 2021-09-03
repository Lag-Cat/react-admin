import { Card } from 'antd'
import layout from './index.module.scss'

const SystemMonitorPage = () => {
    return <div className={layout["systemMonitor"]}>
        <div className={layout["systemMonitor-card"]}>
            <Card className={layout["systemMonitor-card-item"]} title="Default size card" size="small" extra={<a href="#">More</a>} >
                <div id="cpuUtility"></div>
            </Card>
            <Card className={layout["systemMonitor-card-item"]} title="Default size card" size="small" extra={<a href="#">More</a>} >
                <div id="memoryUtility"></div>
            </Card>
            <Card className={layout["systemMonitor-card-item"]} title="Default size card" size="small" extra={<a href="#">More</a>}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>
            <Card className={layout["systemMonitor-card-item"]} title="Default size card" size="small" extra={<a href="#">More</a>} >
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>
            <Card className={layout["systemMonitor-card-item"]} title="Default size card" size="small" extra={<a href="#">More</a>} >
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>
            <Card className={layout["systemMonitor-card-item"]} title="Default size card" size="small" extra={<a href="#">More</a>} >
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>
            <Card className={layout["systemMonitor-card-item"]} title="Default size card" size="small" extra={<a href="#">More</a>} >
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>
            <Card className={layout["systemMonitor-card-item"]} title="Default size card" size="small" extra={<a href="#">More</a>} >
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>
            <Card className={layout["systemMonitor-card-item"]} title="Default size card" size="small" extra={<a href="#">More</a>} >
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>
            <Card className={layout["systemMonitor-card-item"]} title="Default size card" size="small" extra={<a href="#">More</a>} >
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>
            <Card className={layout["systemMonitor-card-item"]} title="Default size card" size="small" extra={<a href="#">More</a>} >
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>
            <Card className={layout["systemMonitor-card-item"]} title="Default size card" size="small" extra={<a href="#">More</a>} >
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>
            <Card className={layout["systemMonitor-card-item"]} title="Default size card" size="small" extra={<a href="#">More</a>} >
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>
        </div>
    </div>
}

export default SystemMonitorPage;