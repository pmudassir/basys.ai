import AuthorizationRequest from '../models/AuthRequest.js';

export const createAuthRequest = async (req, res) => {
  try {
    const newAuthRequest = new AuthorizationRequest(req.body);
    const savedAuthRequest = await newAuthRequest.save();
    res.status(201).json(savedAuthRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllAuthRequests = async (req, res) => {
  try {
    const authRequests = await AuthorizationRequest.find().populate('patientId');
    res.status(200).json(authRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAuthRequestById = async (req, res) => {
  try {
    const authRequest = await AuthorizationRequest.findById(req.params.id).populate('patientId');
    if (!authRequest) return res.status(404).json({ message: 'Authorization Request not found' });
    res.status(200).json(authRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAuthRequest = async (req, res) => {
  try {
    const updatedAuthRequest = await AuthorizationRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAuthRequest) return res.status(404).json({ message: 'Authorization Request not found' });
    res.status(200).json(updatedAuthRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteAuthRequest = async (req, res) => {
  try {
    const deletedAuthRequest = await AuthorizationRequest.findByIdAndDelete(req.params.id);
    if (!deletedAuthRequest) return res.status(404).json({ message: 'Authorization Request not found' });
    res.status(200).json({ message: 'Authorization Request deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
