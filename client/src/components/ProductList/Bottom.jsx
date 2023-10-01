import Filter from './Filter';
import Order from './Order';
/* import Pagination from './Pagination'; */
import styles from './styles/Bottom.module.css'


function Bottom() {
  return (
    <div className={styles.containerMain}>
      <section>
        <Filter />
      </section>
      {/* <section>
        <Pagination />
      </section> */}
      <section>
        <Order />
      </section>
    </div>
  )
}

export default Bottom
