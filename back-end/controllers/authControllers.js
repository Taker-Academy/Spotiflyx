const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Enregistrer un nouvel utilisateur
exports.register = async (req, res) => {
    try {
        const { email, password, password_check } = req.body;

        if (!email || !password || !password_check) {
            return res.status(400).json({ ok: false, error: 'Tous les champs sont requis' });
        }
        if (password !== password_check) {
            return res.status(400).json({ ok: false, error: 'Les mots de passe ne correspondent pas' });
        }
        // Vérifier si l'utilisateur existe déjà
        const userExists = await User.findOne({ where: { email: email } });
        if (userExists) {
            return res.status(409).json({ ok: false, error: 'Cet email est déjà utilisé.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            email: email,
            password: hashedPassword
        });
        // Enregistre l'utilisateur dans la base de données
        await user.save();
        // Générer un token JWT
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        res.status(201).json({
            ok: true,
            data: {
                token: token,
                user: {
                    email: user.email,
                }
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, error: 'Erreur interne du serveur.' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ok: false, error: 'Tous les champs sont requis'});
        }
        // Chercher l'utilisateur par email
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(401).json({ok: false, error: 'Aucun utilisateur trouvé avec cet email.'});
        }
        // Comparer le mot de passe fourni avec celui de la base de données
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ok: false, error : 'Mot de passe incorrect.'});
        }
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        res.status(200).json({
            ok: true,
            data: {
            token: token,
            user: {
                email: user.email,
            }
            }
        });
        } catch (error) {
        console.error(error);
        res.status(500).json({ok: false, error: 'Erreur interne du serveur.'});
        }
  };
