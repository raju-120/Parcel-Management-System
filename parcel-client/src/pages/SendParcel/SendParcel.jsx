import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router';
// import Swal from 'sweetalert2';
// import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const SendParcel = () => {
  const { register, handleSubmit, control } = useForm();
  const { user } = useAuth();
  // const axiosSecure = useAxiosSecure();
  // const navigate = useNavigate();

  const serviceCenters = useLoaderData();
  const regions = [...new Set(serviceCenters.map(c => c.region))];
  
  const senderRegion = useWatch({ control, name: 'senderRegion' });
  const receiverRegion = useWatch({ control, name: 'receiverRegion' });

  const districtsByRegion = region =>
    serviceCenters
      .filter(c => c.region === region)
      .map(d => d.district);

  // const handleSendParcel = data => {
  //   const isDocument = data.parcelType === 'document';
  //   const isSameDistrict = data.senderDistrict === data.receiverDistrict;
  //   const parcelWeight = parseFloat(data.parcelWeight);

  //   let cost = 0;
  //   if (isDocument) {
  //     cost = isSameDistrict ? 60 : 80;
  //   } else {
  //     if (parcelWeight < 3) {
  //       cost = isSameDistrict ? 110 : 150;
  //     } else {
  //       const minCharge = isSameDistrict ? 110 : 150;
  //       const extraWeight = parcelWeight - 3;
  //       const extraCharge = isSameDistrict
  //         ? extraWeight * 40
  //         : extraWeight * 40 + 40;
  //       cost = minCharge + extraCharge;
  //     }
  //   }

  //   data.cost = cost;
  //   data.creation_date = new Date();

  //   Swal.fire({
  //     title: 'Agree with the Cost?',
  //     text: `You will be charged ${cost} taka!`,
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Confirm & Continue'
  //   }).then(result => {
  //     if (result.isConfirmed) {
  //       axiosSecure.post('/parcels', data).then(res => {
  //         if (res.data.insertedId) {
  //           navigate('/dashboard/my-parcels');
  //           Swal.fire({
  //             position: 'top-end',
  //             icon: 'success',
  //             title: 'Parcel Created Successfully',
  //             showConfirmButton: false,
  //             timer: 2500
  //           });
  //         }
  //       });
  //     }
  //   });
  // };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 mt-5 mb-5 rounded-2xl shadow-2xl">
      <h2 className="text-4xl md:text-5xl font-bold text-base-content mb-8 text-center">
        Send A Parcel
      </h2>

      <form
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
