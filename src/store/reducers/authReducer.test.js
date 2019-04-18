// no need of enzyme because we don't render components 
import * as actionTypes from '../actions/actionTypes'
import { authReducer, initialState } from './authReducer'

describe('authReducer', () => {
    it('return the initial state', () => {
        expect(authReducer(undefined, {})).toEqual(initialState)
    })

    it('store token and userId', () => {
        expect(authReducer(initialState, 
        {
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'token',
            userId: 'userId'
        }
        )).toEqual({
            ...initialState,
            token: 'token',
            userId: 'userId',
        }) 
    })
})
