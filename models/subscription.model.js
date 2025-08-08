import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subscription Name is required'],
        trim: true,
        minLength: 2,
        maxLength: 100,
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be greater than 0'],

    },
    currency: {
        type: String,
        enum: ['USD', 'EUR', 'GBP'],
        default: 'USD',
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
    },
    category: {
        type: String,
        enum: ['sport', 'news', 'entertainment', 'lifestyle', 'technology', 'finance', 'politics', 'others'],
        required: [true, 'Category is required'],
    },
    paymentMethod: {
        type: String,
        required: [true, 'Payment Method is required'],
        trim: true,
    },
    status: {
        type: String,
        enum: ['active', 'canceled', 'expired'],
        default: 'active',
    },
    startDate: {
        type: Date,
        required: [true, 'Start Date is required'],
        validate: {
            validator: (v)=> v < new Date(),
            message: 'Start date must be in the past',
        }
    },
    renewalDate: {
        type: Date,
        // required: [true, 'Renewal Date is required'],
        validate: {
            validator: function (v) {
               return  v > this.startDate
            },
            message: 'Renewal date must be after the start date',
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    }
}, {timestamps: true})

// Auto-Calculate the renewal date if missing
subscriptionSchema.pre('save', function (next) {
    if (!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };

        const baseDate = new Date(this.startDate);
        baseDate.setDate(baseDate.getDate() + (renewalPeriods[this.frequency] || 0));
        this.renewalDate = baseDate;
    }

    if (this.renewalDate.getTime() < Date.now()) {
        this.status = 'expired';
    }

    next();
});


const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;