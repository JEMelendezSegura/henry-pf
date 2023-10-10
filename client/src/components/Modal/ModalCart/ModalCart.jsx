
import styles from '../ModalCart/ModelCart.module.css'
import { CardProductMiniCart } from '../../CardProductMiniCart/CardProductMiniCart'
import Button from '@mui/material/Button'
import axios from 'axios'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { isMobile } from 'react-device-detect'
import { useCartStore } from '../../../store/shoppingCartStore'
import { useAuthStore } from '../../../store/authStore'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export const ModalCart = ({ toggleDrawer }) => {
  const { shoppingCart, totalToPay } = useCartStore()

  const {user, setShowRegister}= useAuthStore()
  const navigate= useNavigate()

  const validateTokenUser= async()=>{
    console.log('function')
    console.log(user)
    try {
      if(user.role==='guest'){
        toggleDrawer('right', false)
        setShowRegister()
      } else{
        const {data}=await axios.get('/tokenValidation',{
          withCredentials: true
        })
        if(data.valid) navigate('/payment')
        else{
          return toast.error('Invalid or expired token')
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className={styles.container}>
        {isMobile ? (
          <Button
            variant="contained"
            sx={{ margin: '1rem' }}
            onClick={toggleDrawer}>
            <ArrowBackIcon sx={{ width: '15px' }} />
            back
          </Button>
        ) : null}
        <h1 className={styles.title}>Your cart</h1>
        <p className={styles.subtitle}>Total: ${totalToPay}</p>

        <section className={styles.cardProductContain}>
          {shoppingCart.map((product) => (
            <div key={product.id_product} className={styles.main}>
              <CardProductMiniCart product={product} />
            </div>
          ))}
        </section>
        <section>
          <Button
            variant="contained"
            sx={{ margin: '1rem', size: 'large', backgroundColor: '#010402' }}
            onClick={()=>validateTokenUser()}
            >
            GO TO PAY
          </Button>
        </section>
      </div>
    </>
  )
}