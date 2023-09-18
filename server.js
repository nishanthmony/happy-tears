const express = require('express');
const cors = require('cors');
const {v4: uuidv4} = require('uuid');
const stripe = require('stripe')('sk_test_51NrjrDSDRecEiH5drK5bYeWwGcguKX1h8X2ZlYl7m5J0gaI2otmTvUCqqHmgCl5Q73BzGoV4NqeNCSE836r1fUl300D5Hua9Cg');
