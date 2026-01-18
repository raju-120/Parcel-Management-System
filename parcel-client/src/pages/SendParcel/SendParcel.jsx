import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    control,
  } = useForm({
    defaultValues: {
      parcelType: 'document',
    },
  });

  const { user } = useAuth();
  const serviceCenters = useLoaderData();

  // console.log("User Info: ", user?.uid);

  const regions = [...new Set(serviceCenters.map(c => c.region))];

  const senderRegion = useWatch({ control, name: 'senderRegion' });
  const receiverRegion = useWatch({ control, name: 'receiverRegion' });

  const districtsByRegion = region =>
    serviceCenters
      .filter(c => c.region === region)
      .map(d => d.district);

  const handleSendParcel = (data) => {

    console.log("Parcel Data: ", data)

    const isDocument = data.parcelType === 'document';
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;

    // Safe weight handling
    const weight = Number(data.parcelWeight) || 0;

    // Calculate cost
    let cost = 0;
    let baseCost = 0;
    let extraWeightCharge = 0;
    let outsideCityExtra = 0;

    if (isDocument) {
      // Document fixed price
      cost = isSameDistrict ? 60 : 80;
      baseCost = cost;
    } else {
      // Non-document
      baseCost = isSameDistrict ? 110 : 150;

      if (weight <= 3) {
        cost = baseCost;
      } else {
        extraWeightCharge = Math.ceil(weight - 3) * 40;
        cost = baseCost + extraWeightCharge;

        // Extra 40 for outside city
        if (!isSameDistrict) {
          outsideCityExtra = 40;
          cost += outsideCityExtra;
        }
      }
    }

    
    // SweetAlert2 with pricing breakdown
    Swal.fire({
      title: 'Pricing Breakdown',
      icon: 'info',
      html: `
        <div class="text-left" style="font-size: 15px">
          <p><strong>Parcel Type:</strong> ${isDocument ? 'Document' : 'Non-Document'}</p>
          <p><strong>Delivery Area:</strong> ${isSameDistrict ? 'Within City' : 'Outside City / District'}</p>
          ${!isDocument ? `<p><strong>Weight:</strong> ${weight} kg</p>` : ''}

          <hr style="margin: 10px 0" />

          <p><strong>Base Price:</strong> ${baseCost} TK</p>
          ${extraWeightCharge ? `<p><strong>Extra Weight Charge:</strong> ${extraWeightCharge} TK</p>` : ''}
          ${outsideCityExtra ? `<p><strong>Outside City Extra Charge:</strong> ${outsideCityExtra} TK</p>` : ''}

          <hr style="margin: 12px 0" />
          <h3 style="color: #16a34a; font-size: 20px; font-weight: 600">
            Total Cost: ${cost} TK
          </h3>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Proceed to Payment',
      cancelButtonText: 'Go Back & Edit',
      confirmButtonColor: '#16a34a',
      cancelButtonColor: '#6b7280'
    }).then(result => {
      if (result.isConfirmed) {
        // TODO: Save parcel to DB
        const parcelData = {
          ...data,                     // all form fields
          cost,                         // calculated cost
          created_by: user?.email,      // email of user creating parcel
          user_id: user?.uid,           // current user ID
          delivery_status: 'not_collected',   // default delivery status
          payment_status: 'unpaid',    // default payment status
          creation_date: new Date().toISOString() // timestamp
        };

        console.log('Final Parcel Data:', parcelData);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Parcel Created Successfully',
          showConfirmButton: false,
          timer: 2500
        });
      }
    });
    console.log("COST: ", cost)
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 mt-5 mb-5 rounded-2xl shadow-2xl">
      <h2 className="text-4xl md:text-5xl font-bold text-base-content mb-8 text-center">
        Send A Parcel
      </h2>

      <form onSubmit={handleSubmit(handleSendParcel)}
        className="bg-base-100 p-6 md:p-8 rounded-xl shadow-lg space-y-8"
      >
        {/* Parcel Type */}
        <div className="flex flex-wrap gap-6">
          <label className="label cursor-pointer gap-2">
            <input
              type="radio"
              {...register('parcelType')}
              value="document"
              defaultChecked
              className="radio radio-primary"
            />
            <span className="label-text">Document</span>
          </label>

          <label className="label cursor-pointer gap-2">
            <input
              type="radio"
              {...register('parcelType')}
              value="non-document"
              className="radio radio-primary"
            />
            <span className="label-text">Non-Document</span>
          </label>
        </div>

        {/* Parcel Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            {...register('parcelName')}
            className="input input-bordered w-full"
            placeholder="Parcel Name"
          />
          <input
            {...register('parcelWeight')}
            type="number"
            className="input input-bordered w-full"
            placeholder="Parcel Weight (kg)"
          />
        </div>

        {/* Sender & Receiver */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Sender */}
          <fieldset className="space-y-3">
            <h4 className="text-2xl font-semibold">Sender Details</h4>

            <input
              {...register('senderName')}
              defaultValue={user?.displayName}
              className="input input-bordered w-full"
              placeholder="Sender Name"
            />
            <input
              {...register('senderEmail')}
              defaultValue={user?.email}
              className="input input-bordered w-full"
              placeholder="Sender Email"
            />

            <select {...register('senderRegion')} className="select select-bordered w-full">
              <option disabled selected>
                Pick a region
              </option>
              {regions.map((r, i) => (
                <option key={i}>{r}</option>
              ))}
            </select>

            <select {...register('senderDistrict')} className="select select-bordered w-full">
              <option disabled selected>
                Pick a district
              </option>
              {districtsByRegion(senderRegion).map((d, i) => (
                <option key={i}>{d}</option>
              ))}
            </select>

            <input
              {...register('senderAddress')}
              className="input input-bordered w-full"
              placeholder="Sender Address"
            />
          </fieldset>

          {/* Receiver */}
          <fieldset className="space-y-3">
            <h4 className="text-2xl font-semibold">Receiver Details</h4>

            <input
              {...register('receiverName')}
              className="input input-bordered w-full"
              placeholder="Receiver Name"
            />
            <input
              {...register('receiverEmail')}
              className="input input-bordered w-full"
              placeholder="Receiver Email"
            />

            <select {...register('receiverRegion')} className="select select-bordered w-full">
              <option disabled selected>
                Pick a region
              </option>
              {regions.map((r, i) => (
                <option key={i}>{r}</option>
              ))}
            </select>

            <select {...register('receiverDistrict')} className="select select-bordered w-full">
              <option disabled selected>
                Pick a district
              </option>
              {districtsByRegion(receiverRegion).map((d, i) => (
                <option key={i}>{d}</option>
              ))}
            </select>

            <input
              {...register('receiverAddress')}
              className="input input-bordered w-full"
              placeholder="Receiver Address"
            />
          </fieldset>
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-primary text-xl font-semibold w-full md:w-full">
          Send Parcel
        </button>
      </form>
    </div>
  );
};

export default SendParcel;
