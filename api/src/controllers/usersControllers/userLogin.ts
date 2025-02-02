const { User, Team, RefreshToken} = require('../../db_connection')
import { Request, Response } from 'express'
const {generateAccessToken, generateRefreshToken}= require ('../JWT')


const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    if (!email || !password) {
      res.status(400).json({ message: 'Missing data' })
    } else {
      const userFound = await User.findOne({ where: { email } })
      if (userFound) {
        if (password === userFound.password) {
          const team = await Team.findOne({
            where: { id_team: userFound.TeamIdTeam },
          })
          const teamName = team.name
          const accessToken= generateAccessToken({username:userFound.username,id_user:userFound.id_user, role : userFound.role })
          const refreshToken = generateRefreshToken({username:userFound.username,id_user:userFound.id_user, role : userFound.role }); 
          const expiresAt = new Date();
          expiresAt.setDate(expiresAt.getDate() + 15); 
          const newRefreshToken = await RefreshToken.create({
            token: refreshToken,
            expiresAt: expiresAt,
          });
          await newRefreshToken.setUser(userFound.id_user);
          // res.status(200).cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 15 * 24 * 60 * 60 * 1000, sameSite: 'lax' })
          // res.status(200).cookie('accessToken', accessToken, { httpOnly: true, maxAge: 3600000, sameSite: 'lax' })
          res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: 3600000, sameSite:'lax' })
          res.cookie('refreshToken', newRefreshToken.token, { httpOnly: true, maxAge: 15 * 24 * 60 * 60 * 1000, sameSite:'lax' })
          res.status(200).json({
            id_user: userFound.id_user,
            username: userFound.username,
            first_name: userFound.first_name,
            email: userFound.email,
            avatar: userFound.avatar,
            role: userFound.role,
            TeamIdTeam: userFound.TeamIdTeam,
            active:userFound.active,
            teamName,
            ip_location:userFound.ip_location,
            access: true,
            accessToken : accessToken,
            refreshToken : refreshToken
          })
        } else {
          res.status(401).json({ message: 'Wrong password' })
        }
      } else {
        res.status(404).json({ message: 'User not found' })
      }
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = userLogin
