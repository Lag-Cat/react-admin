import { Card } from 'antd'
import layout from './index.module.scss'

const HomePage = () => {
    return <div className={layout["home"]}>
        <div className={layout["home-news"]}>
            <Card className={layout["home-news-item"]} title="Default size card" size="small" extra={<a href="#">More</a>} >
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>
            <Card className={layout["home-news-item"]} title="Default size card" size="small" extra={<a href="#">More</a>} >
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>
            <Card className={layout["home-news-item"]} title="Default size card" size="small" extra={<a href="#">More</a>}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>
            <Card className={layout["home-news-item"]} title="Default size card" size="small" extra={<a href="#">More</a>} >
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>
        </div>
    </div>
}

export default HomePage;