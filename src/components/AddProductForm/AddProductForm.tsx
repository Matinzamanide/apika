'use client';

import { useEffect, useState } from 'react';

const NewProductForm = () => {
  const [form, setForm] = useState({
    title: '',
    price: '',
    before_discount_price: '',
    images: [''],
    inventory: '',
    categories: [''],
    brand: '',
    catalog_url: '',
    specifications: [{ spec_key: '', spec_label: '', spec_value: '' }],
    product_features: ['']
  });

  useEffect(()=>{
      console.log(form)
  },[form])
  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSpecChange = (
    index: number,
    key: keyof typeof form.specifications[number],
    value: string
  ) => {
    const specs = [...form.specifications];
    specs[index][key] = value;
    setForm({ ...form, specifications: specs });
  };
  

  const addSpec = () => {
    setForm((prev) => ({
      ...prev,
      specifications: [...prev.specifications, { spec_key: '', spec_label: '', spec_value: '' }],
    }));
  };

  const removeSpec = (index: number) => {
    const specs = [...form.specifications];
    specs.splice(index, 1);
    setForm({ ...form, specifications: specs });
  };

  const addImage = () => setForm({ ...form, images: [...form.images, ''] });
  const handleImageChange = (index: number, value: string) => {
    const imgs = [...form.images];
    imgs[index] = value;
    setForm({ ...form, images: imgs });
  };

  const addCategory = () => setForm({ ...form, categories: [...form.categories, ''] });
  const handleCategoryChange = (index: number, value: string) => {
    const cats = [...form.categories];
    cats[index] = value;
    setForm({ ...form, categories: cats });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch('http://localhost/apitak/insert_products.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert('ارسال شد!');
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold">افزودن محصول جدید</h2>

      <input placeholder="عنوان محصول" className="input" value={form.title} onChange={(e) => handleChange('title', e.target.value)} />

      <div className="flex gap-2">
        <input placeholder="قیمت" className="input w-full" value={form.price} onChange={(e) => handleChange('price', e.target.value)} />
        <input placeholder="قیمت قبل تخفیف" className="input w-full" value={form.before_discount_price} onChange={(e) => handleChange('before_discount_price', e.target.value)} />
      </div>

      <div className="space-y-2">
        <label className="block font-medium">تصاویر</label>
        {form.images.map((img, i) => (
          <input key={i} value={img} onChange={(e) => handleImageChange(i, e.target.value)} className="input w-full" placeholder="URL تصویر" />
        ))}
        <button type="button" onClick={addImage} className="btn">+ افزودن تصویر</button>
      </div>

      <input placeholder="موجودی" className="input" value={form.inventory} onChange={(e) => handleChange('inventory', e.target.value)} />

      <div className="space-y-2">
        <label className="block font-medium">دسته‌بندی‌ها</label>
        {form.categories.map((cat, i) => (
          <input key={i} value={cat} onChange={(e) => handleCategoryChange(i, e.target.value)} className="input w-full" placeholder="نام دسته" />
        ))}
        <button type="button" onClick={addCategory} className="btn">+ افزودن دسته</button>
      </div>

      <input placeholder="برند" className="input" value={form.brand} onChange={(e) => handleChange('brand', e.target.value)} />
      <input placeholder="لینک کاتالوگ" className="input" value={form.catalog_url} onChange={(e) => handleChange('catalog_url', e.target.value)} />

      <div className="space-y-2">
        <label className="block font-medium">مشخصات فنی</label>
        {form.specifications.map((spec, i) => (
          <div key={i} className="flex gap-2 items-center">
            <input placeholder="کلید" className="input" value={spec.spec_key} onChange={(e) => handleSpecChange(i, 'spec_key', e.target.value)} />
            <input placeholder="برچسب" className="input" value={spec.spec_label} onChange={(e) => handleSpecChange(i, 'spec_label', e.target.value)} />
            <input placeholder="مقدار" className="input" value={spec.spec_value} onChange={(e) => handleSpecChange(i, 'spec_value', e.target.value)} />
            <button type="button" onClick={() => removeSpec(i)} className="text-red-500">X</button>
          </div>
        ))}
        <button type="button" onClick={addSpec} className="btn">+ افزودن مشخصه</button>
      </div>

      <div className="space-y-2">
  <label className="block font-medium">ویژگی‌های خاص</label>
  {form.product_features.map((feature, i) => (
    <div key={i} className="flex gap-2 items-center">
      <input
        placeholder={`ویژگی ${i + 1}`}
        className="input"
        value={feature}
        onChange={(e) => {
          const updated = [...form.product_features];
          updated[i] = e.target.value;
          setForm({ ...form, product_features: updated });
        }}
      />
      <button
        type="button"
        onClick={() => {
          const updated = [...form.product_features];
          updated.splice(i, 1);
          setForm({ ...form, product_features: updated });
        }}
        className="text-red-500"
      >
        X
      </button>
    </div>
  ))}
  <button
    type="button"
    onClick={() =>
      setForm({ ...form, product_features: [...form.product_features, ''] })
    }
    className="btn"
  >
    + افزودن ویژگی
  </button>
</div>
      <button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700">
        ارسال محصول
      </button>

      <style jsx>{`
        .input {
          border: 1px solid #ccc;
          padding: 8px;
          border-radius: 6px;
          width: 100%;
        }
        .btn {
          background-color: #f0f0f0;
          padding: 6px 12px;
          border-radius: 6px;
        }
      `}</style>
    </form>
  );
};

export default NewProductForm;

// {
//   "title": "دوزینگ",
//   "price": "5000",
//   "before_discount_price": "344444",
//   "images": [
//       ",قم"
//   ],
//   "inventory": "67",
//   "categories": [
//       "دسته بندی"
//   ],
//   "brand": "علی",
//   "catalog_url": "/download",
//   "specifications": [
//       {
//           "spec_key": "برند",
//           "spec_label": "برند",
//           "spec_value": "برند"
//       },
//       {
//           "spec_key": "اعبه",
//           "spec_label": "بثبث",
//           "spec_value": "بثبثب"
//       }
//   ],
//   "product_features": [
//       "تعغتعغ",
//       "تعغتعغت",
//       "ئتئت"
//   ]
// }