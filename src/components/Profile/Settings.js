import React, { useContext } from 'react';
import { useState, useCallback } from 'react';
import './Style/Settings.css';
import { getAuth, updateProfile, updateEmail } from 'firebase/auth';
import SettingsImage from './SettingsImage';
import { updateData } from '../../services/crud';
import { AuthContext } from '../Authentication/AuthContext';

const Settings = ({ setData, data }) => {
  const userData = useContext(AuthContext);
  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [inputValue, setInputValue] = useState({
    birthday: '',
    gender: '',
    location: '',
    organization: '',
    telephone: '',
    userIntroduction: '',
  });
  const [authInputValue, setAuthInputValue] = useState({
    name: '',
    email: '',
  });

  const auth = getAuth();
  const user = auth.currentUser;
  const userObj = userData.userLog.user;
  const userDetailsObj = userData.userLog.userDetails;

  // Edit button

  const clickEditHandler = (e) => {
    if (e.target.name === 'name-btn') {
      setEditName(true);
    } else if (e.target.name === 'email-btn') {
      setEditEmail(true);
    } else {
      setEditName(false);
      setEditEmail(false);
    }
  };

  const clickResetHandler = (e) => {
    if (e.target.name === 'name-btn') {
      setEditName(false);
    } else if (e.target.name === 'email-btn') {
      setEditEmail(false);
    }
  };

  const authChangeHandler = (e) => {
    setAuthInputValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const changeHandler = (e) => {
    setInputValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    //console.log(inputValue);
  };

  const updateProfileName = useCallback(() => {
    if (authInputValue.name !== '') {
      updateProfile(user, {
        displayName: authInputValue?.name || userObj.displayName,
      })
        .then(() => {
          console.log(user.displayName);
        })
        .then(() => {
          alert(`Username has been successfully changed to ${authInputValue.name}!`);
          //user.displayName
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      return null;
    }
  }, [user, authInputValue.name, userObj.displayName]);

  const updateProfileEmail = useCallback(() => {
    if (authInputValue.email !== '') {
      updateEmail(user, authInputValue?.email || userObj.email)
        .then(() => {
          alert(
            `Email address has been successfully changed to ${authInputValue.email}!`
          );
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      return null;
    }
  }, [user, authInputValue.email, userObj.email]);

  const authSubmitHandler = (e) => {
    e.preventDefault();

    updateProfileName();
    updateProfileEmail();
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    updateData('userDetails', user.uid, {
      birthday: inputValue?.birthday || userDetailsObj.birthday,
      gender: inputValue?.gender || userDetailsObj.gender,
      location: inputValue?.location || userDetailsObj.location,
      organization: inputValue?.organization || userDetailsObj.organization,
      telephone: inputValue?.telephone || userDetailsObj.telephone,
      userIntroduction: inputValue?.userIntroduction || userDetailsObj.userIntroduction,
    });
  };

  return (
    <div className='settings-form-container'>
      <h1>Account Settings</h1>
      <form action='' className='settings-form' onSubmit={authSubmitHandler}>
        {/*Name*/}
        <div className='settings-name'>
          <label htmlFor='name' className='label-form label-name'>
            Username
          </label>
          {editName && (
            <input
              type='text'
              className='input-name'
              name='name'
              id='name'
              placeholder={userObj.displayName}
              onChange={authChangeHandler}
            />
          )}
          <span>
            <button
              type='button'
              name='name-btn'
              className='edit-button'
              onClick={clickEditHandler}
              onDoubleClick={clickResetHandler}
            >
              edit
            </button>
          </span>
        </div>
        {/*Email*/}
        <div className='settings-email'>
          <label htmlFor='email' className='label-form label-email'>
            Email
          </label>
          {editEmail && (
            <input
              type='email'
              className='input-email'
              name='email'
              id='email'
              placeholder={userObj.email}
              onChange={authChangeHandler}
            />
          )}
          <span>
            <button
              type='button'
              name='email-btn'
              className='edit-button'
              onClick={clickEditHandler}
              onDoubleClick={clickResetHandler}
            >
              edit
            </button>
          </span>
        </div>
        <button type='submit' className='save-button'>
          Save
        </button>
      </form>
      <form action='' className='settings-form' onSubmit={formSubmitHandler}>
        {/*Image*/}
        <div className='settings-image-container'>
          <SettingsImage />
        </div>
        {/*Location*/}
        <div className='settings-location'>
          <label htmlFor='location' className='label-form label-location'>
            Location
          </label>
          <input
            type='text'
            name='location'
            className='input-location'
            placeholder={userDetailsObj?.location}
            onChange={changeHandler}
            id='location'
          />
        </div>
        {/*Birthday*/}
        <div className='settings-date'>
          <label htmlFor='date' className='label-form label-date'>
            Birthday
          </label>
          <input
            type='date'
            id='date'
            name='birthday'
            className='input-date'
            onChange={changeHandler}
            //placeholder={userDetailsObj?.birthday}
          />
        </div>
        {/*Telephone*/}
        <div className='settings-telephoneNumber'>
          <label htmlFor='telephone' className='label-form label-telephone'>
            Telephone number
            <input
              type='tel'
              id='telephone'
              name='telephone'
              className='input-telephone'
              onChange={changeHandler}
              placeholder={ userDetailsObj?.telephone || '+00-00-000-0000'}
              pattern='[0-9]{2}-[0-9]{2}-[0-9]{3}-[0-9]{4}'
            />
          </label>
        </div>
        {/*Gender*/}
        <div className='settings-gender'>
          <label htmlFor='gender' className='label-form label-gender'>
            Gender
          </label>
          <select
            className='select-gender'
            name='gender'
            id='gender'
            onChange={changeHandler}
            value={userDetailsObj?.gender}
          >
            <option value='0'>Open this select menu</option>
            <option value='female'>Female</option>
            <option value='male'>Male</option>
            <option value='other'>None of these choices</option>
          </select>
        </div>
        {/*Introduction*/}
        <div className='settings-introduction'>
          <label htmlFor='userIntroduction' className='label-form label-introduction'>
            Introduction
          </label>
          <textarea
            id='userIntroduction'
            name='userIntroduction'
            className='textarea-introduction'
            placeholder={userDetailsObj?.userIntroduction}
            onChange={changeHandler}
          ></textarea>
        </div>
        <div className='settings-classification'>
          <div className='classification-personal'>
            <input
              name='organization'
              type='radio'
              id='personal'
              value={false}
              onChange={changeHandler}
              defaultChecked={userDetailsObj.organization === 'false'}
            />
            <label className='form-radio-label' htmlFor='personal'>
              Personal
            </label>
          </div>
          {/*Organization*/}
          <div className='classification-organization'>
            <input
              name='organization'
              type='radio'
              id='organization'
              value={true}
              onChange={changeHandler}
              defaultChecked={userDetailsObj.organization === 'true'}
            />
            <label className='form-radio-label' htmlFor='organization'>
              Organization
            </label>
          </div>
        </div>
        <button type='submit' className='save-button'>
          Save
        </button>
      </form>
    </div>
  );
};

export default Settings;
