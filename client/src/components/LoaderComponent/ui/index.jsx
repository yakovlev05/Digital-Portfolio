import {LoadingOutlined} from '@ant-design/icons';
import {Spin} from 'antd';
import styles from './styles.module.scss'

const LoaderComponent = () => {
    return (
        <div className={styles.loader}>
            <Spin className={styles.spin}
                  indicator={<LoadingOutlined style={{fontSize: 56}} color={'#CC4740 !important'} spin/>}/>
        </div>
    )
}

export default LoaderComponent;