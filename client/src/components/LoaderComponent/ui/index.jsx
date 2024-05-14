import {LoadingOutlined} from '@ant-design/icons';
import {Spin} from 'antd';
import styles from './styles.module.scss'

const LoaderComponent = () => {
    return (
        <div className={styles.loader}>
            <Spin indicator={<LoadingOutlined style={{fontSize: 56}} spin/>}/>
        </div>
    )
}

export default LoaderComponent;